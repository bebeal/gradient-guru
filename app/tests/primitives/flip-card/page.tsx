'use client'

import { FlipCard, IconSetCache } from "@/components";
import { useState } from "react";

const FlipCardPage = () => {
  const [value, setValue] = useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex items-center justify-center gap-10">
        <FlipCard
          className="w-[200px]"
          title="Flip Card"
          front={{
            children: (
              <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                <div className="flex w-auto h-auto justify-center items-center">Front Content</div>
                <div className="text-[50px] leading-none w-auto h-auto flex justify-center items-center">
                  😇
                </div>
                <IconSetCache.Carbon.Awake width="50" />
              </div>
            )
          }}
          back={{
            children: (
              <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                <div className="flex w-auto h-auto justify-center items-center">Back Content</div>
                <div className="text-[50px] leading-none w-auto h-auto flex justify-center items-center">
                  😈
                </div>
                <IconSetCache.Carbon.Asleep width="50" />
              </div>
            )
          }}
        />
        <FlipCard
          className="w-[100px]"
          title="Only Front"
          front={{
            children: <div>wow</div>
          }}
        />
        <FlipCard
          className="w-[100px]"
          title="Only Back"
          back={{
            children: <div>wow</div>
          }}
        />
      </div>
    </div>
  )
};

export default FlipCardPage;

