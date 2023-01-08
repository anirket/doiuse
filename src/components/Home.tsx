import { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { FaSkull } from 'react-icons/fa';
import Footer from '../scenes/Footer';
import InputForm from '../scenes/InputForm';
import { getData } from '../services/service';
import { defaultErrorMessage, tipBrowserList } from '../utils/constants';
import { AiFillBulb } from 'react-icons/ai';

const BrowserData = lazy(() => import('../scenes/BrowserData'));
const Compatibility = lazy(() => import('../scenes/Compatibility'));

const Home = () => {
  const [onErrorMessage, setOnErrorMessage] = useState<string>('');
  const [isResultsLoading, setResultsLoading] = useState<boolean>(false);
  const [responseData, setresponseData] = useState<{
    browserListData: Record<string, string>;
    compatibilityData: Record<string, any>;
    userQuery: string;
  }>({
    browserListData: {},
    compatibilityData: {},
    userQuery: '',
  });

  const getInfo = useCallback(async () => {
    try {
    const getDataList = await getData();
    if(getDataList?.apierror) {
      setOnErrorMessage(defaultErrorMessage);
      return;
    }
    setresponseData((prev) => ({
      ...prev,
      compatibilityData: getDataList,
    }));
      
    } catch (error) {
      setOnErrorMessage(defaultErrorMessage);
    }
    
  }, []);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <>
      <section className="mt-5 px-5 xl:px-48">
        <InputForm
          setonErrorMessage={setOnErrorMessage}
          setResultsLoading={setResultsLoading}
          setresponseData={setresponseData}
          isResultsLoading={isResultsLoading}
        />
        {onErrorMessage.length ? (
          <div className="w-full flex justify-center pt-10 text-center flex-col items-center">
            <FaSkull className='text-red-500' />
            <span className="mt-5 text-red-400">{onErrorMessage}</span>
          </div>
        ) : (
          <>
            <Suspense fallback={<></>}>
              <BrowserData browserListData={responseData.browserListData} />
              <Compatibility {...responseData} />
            </Suspense>
          </>
        )}
        {!responseData.userQuery.length ? (
          <>
            <div className="flex justify-center text-center mt-10">
              Dont know what Browserlist is ? checkout &nbsp;{' '}
              <a
                href="https://browsersl.ist/"
                className="text-blue-500 underline"
                target="_blank"
                rel="noreferrer"
              >
                BrowserList
              </a>
            </div>
            <div className="pro-tip-wrapper flex justify-center  w-full">
              <div className="pro-tip bg-gray-100 w-96 mt-10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  Tip - Try BrowserList string:  <AiFillBulb className="text-yellow-300 text-xl" />
                </div>
                <div className='italic pt-5'> </div> 

                <div className='text-lg mt-5'>{tipBrowserList[Math.floor(Math.random() * tipBrowserList.length)]}</div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Home;
