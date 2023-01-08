import React, { useCallback, useState } from 'react';
import { Browserkeys, mapBrowserstoImages } from '../utils/constants';
import { HiChevronUpDown } from 'react-icons/hi2';

type Props = {
  browserListData: Record<string, string>;
};

const BrowserData = (props: Props) => {
  const { browserListData } = props;

  const isBrowserDataExists = Object.keys(browserListData).length;

  const [isConstituentsExpanded, setConstituentsExpanded] = useState(false);

  const expandConstituents = useCallback(() => {
    setConstituentsExpanded((prev) => !prev);
  }, []);

  return (
    <section
      className={`bg-gray-200 mt-5 rounded-xl p-2 ${
        isBrowserDataExists ? '' : 'hidden'
      }`}
    >
      {isBrowserDataExists ? (
        <div
          className="text-xl pl-2 flex justify-between items-center pb-1 md:pb-2"
          onClick={expandConstituents}
        >
          Detected Browsers (Min. versions)
          <span className="mr-2 md:hidden">
            <HiChevronUpDown />
          </span>
        </div>
      ) : (
        <></>
      )}
      <ul
        className={`flex flex-col md:flex-wrap ${
          isConstituentsExpanded ? '' : 'h-0 overflow-hidden'
        } ${isBrowserDataExists > 5 ? 'md:min-h-[250px]' : 'md:h-fit'}`}
      >
        {Object.keys(browserListData).map((browser) => (
          <li key={browser} className="flex p-1 bg-gray-300 m-2 rounded-lg">
            <img
              className="pr-2"
              src={`/assets/${mapBrowserstoImages[browser as Browserkeys]}`}
              alt=""
            />
            <div className="flex justify-between w-full">
              {browser}
              <span className="pr-2 text-green-800">
                {browserListData[browser]}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BrowserData;
