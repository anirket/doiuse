import axios from 'axios';
import { apiConfig } from '../utils/apiConfig';

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
    const restructuredData = data.reduce((prev, curr) => Object.assign(prev, {
        [curr.name]: Object.keys(curr.versions)[0].split('-')[0]
    }),{})
    return restructuredData;
};
