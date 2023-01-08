import React from 'react';
import { filteredData } from '../services/service';
import CompatibleValue from './CompatibleValue';

type Props = {
  browserListData: Record<string, string>;
  compatibilityData: Record<string, any>;
  userQuery: string;
};

const Compatibility = (props: Props) => {
  const { compatibilityData, userQuery, browserListData } = props;

  const getRelevantData: Record<string, any> = filteredData(
    compatibilityData,
    userQuery,
    browserListData
  );

  return (
    <section className="flex w-full flex-wrap justify-around">
      {Object.keys(getRelevantData).map((relevantDatakey) => (
        <CompatibleValue
          key={relevantDatakey}
          info={{
            ...compatibilityData[relevantDatakey],
            name: relevantDatakey,
            supportWithRespectToValues: getRelevantData?.[relevantDatakey],
          }}
        />
      ))}
    </section>
  );
};

export default React.memo(Compatibility);
