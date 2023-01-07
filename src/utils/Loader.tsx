import { ColorRing } from 'react-loader-spinner';

type Props = {
  type : SpinnerType
};

const Loader = (props: Props) => {
  const {type: loaderType} = props;

  if(loaderType === SpinnerType.PageLoader) {
    return (
      <section className='w-full flex justify-center'>
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
  }
  return <></>
  
};

export default Loader;
