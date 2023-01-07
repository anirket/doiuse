import { Suspense, lazy, useState } from 'react';
import Footer from '../scenes/Footer';
import InputForm from '../scenes/InputForm';
import { SpinnerType } from '../utils/constants';
import Loader from '../utils/Loader';

const BrowserData = lazy(() => import('../scenes/BrowserData'));

const Home = () => {
  const [onErrorMessage, setOnErrorMessage] = useState<string>('');
  const [isResultsLoading, setResultsLoading] = useState<boolean>(false);

  return (
    <>
      <section className="mt-5 px-5 xl:px-48">
        <InputForm
          setonErrorMessage={setOnErrorMessage}
          setResultsLoading={setResultsLoading}
          isResultsLoading={isResultsLoading}
        />
        <Suspense fallback={<Loader type={SpinnerType.PageLoader} />}>
          <BrowserData />
        </Suspense>
      </section>
      <Footer />
    </>
  );
};

export default Home;
