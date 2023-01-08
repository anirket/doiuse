import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {
  identifyBrowsersFromResponse,
  validateBrowserlistString,
} from '../services/service';
import { defaultErrorMessage, SpinnerType } from '../utils/constants';
import Loader from '../utils/Loader';

type Props = {
  setonErrorMessage: Dispatch<SetStateAction<string>>;
  setResultsLoading: Dispatch<SetStateAction<boolean>>;
  setresponseData: Dispatch<
    SetStateAction<{
      browserListData: Record<string, string>;
      compatibilityData: Record<string, any>;
      userQuery: string,
    }>
  >;
  isResultsLoading: boolean;
};

const InputForm = (props: Props) => {
  const [inputData, setInputData] = useState<{
    browserList: string;
    searchQuery: string;
  }>({
    browserList: '',
    searchQuery: '',
  });

  const {
    setonErrorMessage,
    isResultsLoading,
    setResultsLoading,
    setresponseData,
  } = props;

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const {
        target: { name, value },
      } = event;
      setInputData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const onSearch = useCallback(async () => {
    setResultsLoading(true);
    if (!inputData.browserList.length || !inputData.searchQuery.length) {
      setonErrorMessage('Please Enter all Inputs!');
      setResultsLoading(false);
      return;
    }

    // Verify BrowserList Data
    const getBrowserList = await validateBrowserlistString(
      inputData.browserList
    );
    if (getBrowserList?.error) {
      setonErrorMessage(getBrowserList?.error || defaultErrorMessage);
      return;
    }
    const identifyBrowsers = identifyBrowsersFromResponse(getBrowserList);
    setresponseData(prev => ({
      ...prev,
      userQuery: inputData.searchQuery,
      browserListData: identifyBrowsers,
    }));
    setResultsLoading(false);
  }, [inputData, setonErrorMessage, setResultsLoading, setresponseData]);

  return (
    <div className="user-input">
      <div className="w-full md:flex justify-around gap-8 items-center">
        <section className="md:w-[70%]">
          <label className="text-sm pl-[3px]" htmlFor="section">
            Enter BrowserList String
          </label>
          <input
            className="w-full h-8 border-[1.5px] outline-none focus:shadow-sm rounded-md p-2 focus:border-blue-300 focus:border-2 mt-2"
            name="browserList"
            placeholder="Eg: last 2 Chrome versions"
            type="text"
            value={inputData.browserList}
            onChange={onInputChange}
          />
        </section>
        <section className="md:w-[30%]mt-4 md:mt-0">
          <label className="text-sm pl-[3px]" htmlFor="section">
            Search
          </label>
          <input
            className="w-full h-8 border-[1.5px] outline-none focus:shadow-sm rounded-md p-2 focus:border-blue-300 focus:border-2 mt-2"
            name="searchQuery"
            type="text"
            value={inputData.searchQuery}
            onChange={onInputChange}
            placeholder="Eg: Intl.NumberFormat"
          />
        </section>
        <button
          onClick={onSearch}
          className="p-[5px] flex justify-center px-4 mt-8 border-2 text-sm rounded-lg w-full md:h-[34px] md:w-[100px] md:min-w-[100px] relative hover:border-blue-500"
        >
          {isResultsLoading ? (
            <Loader type={SpinnerType.buttonLoader} />
          ) : (
            <>Search</>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
