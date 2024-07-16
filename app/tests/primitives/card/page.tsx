'use client';

import { useState } from 'react';
import { Card, Icon } from '@/components';

const CardPage = () => {
  const [value, setValue] = useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex items-center justify-center gap-10">
        <Card
          className="w-[200px]"
          front={{
            title: 'Front Title',
            children: (
              <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                <div className="flex w-auto h-auto justify-center items-center">Front Content</div>
                <div className="text-[50px] leading-none w-auto h-auto flex justify-center items-center">🔥</div>
                <Icon set="Carbon" icon="Awake" width="50" height="100%" />
              </div>
            ),
          }}
          back={{
            title: 'Back Title',
            children: (
              <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                <div className="flex w-auto h-auto justify-center items-center">Back Content</div>
                <div className="text-[50px] leading-none w-auto h-auto flex justify-center items-center">🧊</div>
                <Icon set="Carbon" icon="Asleep" width="50" height="100%" />
              </div>
            ),
          }}
        />
        <Card
          className="w-[200px]"
          front={{
            title: 'Only Front',
            children: (
              <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                <div className="flex w-auto h-auto justify-center items-center">Front Content</div>
                <div className="text-[50px] leading-none w-auto h-auto flex justify-center items-center">🔥</div>
                <Icon set="Carbon" icon="Awake" width="50" height="100%" />
              </div>
            ),
          }}
        />
        <Card
          className="w-[200px]"
          back={{
            title: 'Only Back',
            children: (
              <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                <div className="flex w-auto h-auto justify-center items-center">Back Content</div>
                <div className="text-[50px] leading-none w-auto h-auto flex justify-center items-center">🧊</div>
                <Icon set="Carbon" icon="Asleep" width="50" height="100%" />
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default CardPage;
