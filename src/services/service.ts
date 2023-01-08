import axios from 'axios';
import { stringify } from 'querystring';
import { apiConfig } from '../utils/apiConfig';
import {
  Browserkeys,
  DatakeysforBrowserAvailable,
  mapBrowserKeyToData,
} from '../utils/constants';

type AxiosErroResponse = {
  response: {
    data: {
      message: string;
    };
  };
};

type BrowserResponse = Array<{
  coverage: Number;
  id: string;
  name: string;
  versions: Record<string | number, number>;
}>;

type InfoData = {
  __compat?: Record<string, any>;
  __meta?: Record<string, any>;
};

export const validateBrowserlistString = async (inputString: string) => {
  //remove Quotations if any
  const trimQuotations = inputString.replaceAll('"', '').replace("'", '');
  try {
    const getBrowserListValidated = await axios.get(
      `${apiConfig.BROWSERLIST_VALIDATOR}`,
      { params: { q: trimQuotations } }
    );
    return getBrowserListValidated.data.browsers;
  } catch (error) {
    return {
      error: (error as AxiosErroResponse).response.data.message,
    };
  }
};

export const identifyBrowsersFromResponse = (data: BrowserResponse) => {
  const restructuredData = data.reduce(
    (prev, curr) =>
      Object.assign(prev, {
        [curr.name]: Object.keys(curr.versions)[0].split('-')[0],
      }),
    {}
  );
  return restructuredData;
};

export const filteredData = (
  compatibilityData: Record<string, any>,
  userQuery: string,
  browserListData: Record<string, string>
) => {
  if (userQuery.length === 0) {
    return [];
  }
  const query = userQuery.toLocaleLowerCase();
  const getCompatibleDataKeys = Object.keys(compatibilityData);

  const getFilteredKeys = getCompatibleDataKeys.filter((compatibilityKey) =>
    compatibilityKey.toLocaleLowerCase().includes(query)
  );

  let querySupport = {};
  getFilteredKeys.forEach((key) => {
    const supportKeys = Object.keys(compatibilityData[key].support);
    let supported = {};
    supportKeys.forEach((featureSupport) => {
      if (mapBrowserKeyToData[featureSupport as DatakeysforBrowserAvailable]) {
        const version_added =
          compatibilityData[key].support[featureSupport]?.version_added ||
          compatibilityData[key].support[featureSupport][0]?.version_added;
        if (!isNaN(Number(version_added))) {
          const feature_version_support = Number(version_added);
          const user_version_support = Number(
            browserListData[
              mapBrowserKeyToData[featureSupport as DatakeysforBrowserAvailable]
            ]
          );
          if (!isNaN(user_version_support)) {
            supported = {
                ...supported,
                [featureSupport]:  feature_version_support <= user_version_support
            }
          }
        }
      }

    });
    querySupport = {
        ...querySupport,
        [key] : supported
    }
  });
  return querySupport;
};

export const getData = async () => {
  try {
    const getBrowserListValidated = await axios.get(
      `${apiConfig.GET_QUERY_DETAILS}`
    );
    // delete unwanted fields
    delete getBrowserListValidated.data.browsers;
    const getmodifiedData = restructuredData(getBrowserListValidated.data);
    return getmodifiedData;
  } catch (error) {
    return {
      error: (error as AxiosErroResponse).response.data.message,
    };
  }
};

// restructure the Feature List
export const restructuredData = (data: any) => {
  const surfaceDataKeys = Object.keys(data);

  let reserve_array: Record<string, any>[] = [];
  const final_structured_data: Record<string, any> = {};

  surfaceDataKeys.map((surfaceKey) => {
    if ((data[surfaceKey as any] as InfoData)?.__compat) {
      final_structured_data.push({
        [surfaceKey]: (data[surfaceKey as any] as InfoData)?.__compat,
      });
      final_structured_data[surfaceKey] = (
        data[surfaceKey as any] as InfoData
      )?.__compat;
    } else {
      if (data[surfaceKey as any]) {
        reserve_array.push(data[surfaceKey as any] as InfoData);
      }
    }
  });

  // remove __meta field
  delete (reserve_array as InfoData)?.__meta;

  while (reserve_array.length !== 0) {
    // eslint-disable-next-line no-loop-func
    reserve_array.map((reserve_data) => {
      const getkeys = Object.keys(reserve_data);
      getkeys.forEach((key) => {
        if (reserve_data[key]?.__compat) {
          final_structured_data[key] = reserve_data[key]?.__compat;
        }
        if (
          typeof reserve_data[key] === 'object' &&
          Object.keys(reserve_data[key]).length > 1
        ) {
          delete reserve_data[key]?.__compat;
          reserve_array.push(reserve_data[key]);
        }
        delete reserve_data[key];
      });
    });

    var updated_reserve_array = reserve_array.filter(
      (value) => Object.keys(value).length !== 0
    );
    reserve_array = updated_reserve_array;
  }
  return final_structured_data;
};
