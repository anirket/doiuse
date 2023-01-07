import { Suspense, lazy } from 'react';
import Footer from '../scenes/Footer';
import InputForm from '../scenes/InputForm';
import Loader from '../utils/Loader';

const DisplayData = lazy(() => import('../scenes/BrowserData'));

const Home = () => {
  return (
    <>
      <section className="mt-5 px-5">
        <InputForm />
        <Suspense fallback={<Loader type={SpinnerType.PageLoader} />}>
          <DisplayData />
        </Suspense>
      </section>
      <Footer />
    </>
  );
};

export default Home;
