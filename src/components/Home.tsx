import { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import Footer from '../scenes/Footer';
import InputForm from '../scenes/InputForm';
import { getData } from '../services/service';
import { SpinnerType } from '../utils/constants';
import Loader from '../utils/Loader';

const BrowserData = lazy(() => import('../scenes/BrowserData'));
const Compatibility = lazy(() => import('../scenes/Compatibility'));

const Home = () => {
  const [onErrorMessage, setOnErrorMessage] = useState<string>('');
  const [isResultsLoading, setResultsLoading] = useState<boolean>(false);
  const [responseData, setresponseData] = useState<{
    browserListData: Record<string, string>;
    compatibilityData: Record<string, any>;
    userQuery: string,
  }>({
    browserListData: {},
    compatibilityData: {},
    userQuery: '',
  });

  const getInfo = useCallback(async () => {
    const getDataList = await getData();
    console.log(getDataList);
    setresponseData((prev) => ({
      ...prev,
      compatibilityData: getDataList,
    }));
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
        <Suspense fallback={<Loader type={SpinnerType.PageLoader} />}>
          <BrowserData browserListData={responseData.browserListData} />
          <Compatibility {...responseData} />
        </Suspense>
      </section>
      <Footer />
    </>
  );
};

export default Home;
