import { ColorRing, MagnifyingGlass } from 'react-loader-spinner';
import { SpinnerType } from './constants';

type Props = {
  type: SpinnerType;
};

const Loader = (props: Props) => {
  const { type: loaderType } = props;

  switch (loaderType) {
    case SpinnerType.PageLoader:
      return (
        <section className="w-full flex justify-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </section>
      );
    case SpinnerType.buttonLoader:
      return (
          <MagnifyingGlass
            visible={true}
            height="25"
            width="25"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
      );
    default:
      return <></>;
  }
};

export default Loader;
