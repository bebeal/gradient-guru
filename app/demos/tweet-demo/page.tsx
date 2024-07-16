'use client'

import { Terminal, Tweet } from "@/components";
import { DivArrow } from "@/utils/svg";

const TweetDemo = () => {
  const title = "Tweet Demo";
  const code = "<Tweet id=\"1776335603115741310\" />";
  return (
    <div className="flex flex-col w-auto h-auto justify-center items-center gap-1 p-2 overflow-auto bg-primary">
      <div className="text-2xl font-bold text-center underline">{title}</div>
        <div className="flex flex-row gap-10 min-h-[600px]">
          <div className="flex flex-col w-auto h-auto items-center justify-center">
            <Terminal language={"javascript"}>{code}</Terminal>
          </div>
          <DivArrow />
          <div className="flex flex-col w-auto h-auto items-center justify-center">
            <Tweet id="1776335603115741310" />
          </div>
        </div>
    </div>
  );
};

export default TweetDemo;
