'use client'

import { IconSetCache } from '@/components';
import { useState } from 'react';

const IconSets = () => {
  const [size, setSize] = useState<number>(32);

  return (
    <>
      {Object.keys(IconSetCache).map((iconSetName: any) => {
        const IconSet = IconSetCache[iconSetName];
        return (
          <div key={iconSetName} className="flex flex-col justify-center align-center gap-2 rounded">
            <div className="text-2xl flex w-full justify-center align-center">{iconSetName}</div>
            <div className="flex justify-center align-center gap-1 flex-wrap">
              {Object.entries(IconSet).map(([IconName, Icon]: any, i: number) => {
                return (
                  <div
                    key={IconName}
                    className="flex bg-gray-600 bg-opacity-[50%] border border-gray-400 rounded shadow-2xl"
                  >
                    <div className="flex flex-col items-center justify-center gap-1 p-1 w-full h-full">
                      <Icon height={`${size}px`} width={`${size}px`} className={`text-white w-auto h-[${size}px]`} />
                      <div className="text-md">{IconName}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
export default IconSets;
