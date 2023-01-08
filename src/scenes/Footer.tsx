import { AiFillGithub } from 'react-icons/ai';

type Props = {};

const Footer = (props: Props) => {
  return (
    <section className="fixed bottom-0 bg-gray-100 w-full p-2 flex justify-around items-center">
      <div>
        Powered by &nbsp;
        <a
          className="text-blue-500 underline"
          href="https://browsersl.ist/"
          target="_blank"
          rel="noreferrer"
        >
          BrowserList
        </a>
        &nbsp; and &nbsp;{' '}
        <a
          className="text-blue-500 underline"
          href="https://developer.mozilla.org/"
          target="_blank"
          rel="noreferrer"
        >
          MDN
        </a>
      </div>
      <div>
        <a href="https://github.com/anirket" target="_blank" rel="noreferrer">
          {' '}
          <AiFillGithub className='text-xl' />
        </a>
      </div>
    </section>
  );
};

export default Footer;
