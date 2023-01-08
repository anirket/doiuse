import React from 'react';
import {
  Browserkeys,
  DatakeysforBrowserAvailable,
  mapBrowserKeyToData,
  mapBrowserstoImages,
} from '../utils/constants';
import { FaSkullCrossbones } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { VscLinkExternal } from 'react-icons/vsc';

type Props = {
  info: {
    name: string;
    support?: Record<
      string,
      {
        version: string;
      }
    >;
    deprecated: boolean;
    experimental: boolean;
    description: string;
    source_file: string;
    spec_url?: string;
    mdn_url?: string;
    supportWithRespectToValues: Record<string, boolean>;
  };
};

const CompatibleValue = (props: Props) => {
  const {
    info: {
      name,
      spec_url = undefined,
      mdn_url = undefined,
      deprecated,
      experimental,
      supportWithRespectToValues,
    },
  } = props;
  console.log(spec_url || mdn_url);
  return (
    <>
      {Object.keys(supportWithRespectToValues).length ? (
        <div className="bg-gray-200 md:m-10 m-4 p-2 w-[325px] rounded-lg">
          <span className="p-2 text-lg font-semibold flex items-center justify-between">
            <span className=' w-72'>{name.length > 15 ? <>{name.substring(0, 25)}...</> : <>{name}</>}</span>
            {(spec_url || mdn_url) && (
              <a href={spec_url || mdn_url} target="_blank" rel="noreferrer">
                {' '}
                <VscLinkExternal />
              </a>
            )}
          </span>
          <div className='extra-details'>
            {deprecated && (<><span>Deprecated</span></>)}
          </div>
          <ul className="">
            {Object.keys(supportWithRespectToValues).map((supportKeys) => (
              <li
                className={`flex justify-between items-center p-1 rounded-lg ${
                  supportWithRespectToValues[supportKeys]
                    ? 'bg-green-300'
                    : 'bg-red-300'
                } m-2 my-4 w-72`}
              >
                <span className="flex">
                  <img
                    src={`/assets/${
                      mapBrowserstoImages[
                        mapBrowserKeyToData[
                          supportKeys as DatakeysforBrowserAvailable
                        ] as Browserkeys
                      ]
                    }`}
                    alt=""
                  />
                  {
                    mapBrowserKeyToData[
                      supportKeys as DatakeysforBrowserAvailable
                    ]
                  }
                </span>

                {supportWithRespectToValues[supportKeys] ? (
                  <TiTick />
                ) : (
                  <FaSkullCrossbones />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CompatibleValue;
