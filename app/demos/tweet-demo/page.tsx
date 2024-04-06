'use client'

import { Tweet } from "@/components";

const TweetDemo = () => {
  const title = "Tweet Demo";
  return (
    <div className="flex flex-col w-auto h-auto justify-center items-center gap-1 p-2 overflow-auto bg-primary">
      <div className="text-2xl font-bold text-center underline">{title}</div>
        <div className="flex flex-col gap-10 w-full h-full justify-center items-center p-10">
        {/* ;-) */}
        <Tweet id="1776335603115741310" />
      </div>
    </div>
  );
};

export default TweetDemo;
