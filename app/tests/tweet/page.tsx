'use client'

import { Tweet } from "@/components";
import { FC } from "react";

const TweetsToDemo: Record<string, FC> = {
  tweet: () => <Tweet id="1775175303284797538" />,
};

const StyledComponentsTest = () => {
  const title = 'Tweet Embed';
  return (
    <div className="flex flex-col w-auto h-auto justify-center items-center gap-1 p-2 overflow-auto bg-primary">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <div className="flex flex-col gap-10 w-full h-full justify-center items-center p-10">
        {Object.keys(TweetsToDemo).map((key: any) => {
          const DemoTweet: any = TweetsToDemo[key];
          return (
            <div key={key} className="flex flex-col rounded items-center justify-center w-full h-full overflow-auto bg-primary text-primary gap-2 border border-primary p-2">
              <div className="flex flex-col items-center justify-center w-full h-auto gap-1 text-sm">
                <h1 className="text-md font-bold text-center">{key}</h1>
                <DemoTweet />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StyledComponentsTest;
