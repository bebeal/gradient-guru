'use client'

import { TargetIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { throttle } from "lodash";
import { FC, useState } from "react";

// Test for react-gieger (set to true in dev tool config)
const ReactGeigerTool = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = throttle((event: any) => {
    // Update position state with mouse coordinates
    setPosition({
      x: event.clientX,
      y: event.clientY
    });
  }, 1000);

  return (
    <IconButton className="p-2 m-2 hover:cursor-pointer" color="jade" radius="large" variant="surface" onMouseMove={handleMouseMove}>
      <TargetIcon width="64" height="64" />
    </IconButton>
  );
};

const DevToolExamples: Record<string, FC> = {
  ReactGeigerTool,
}

const DevToolsPage = () => {
  const title = 'Dev Tools';
  return (
    <div className="flex flex-col w-auto h-auto justify-center items-center gap-1 p-2 overflow-auto bg-primary">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <div className="flex flex-col gap-10 w-full h-full justify-center items-center p-10">
        {Object.keys(DevToolExamples).map((key: any) => {
          const DevToolExample: any = DevToolExamples[key];
          return (
            <div key={key} className="flex flex-col rounded items-center justify-center w-full h-full overflow-auto bg-primary text-primary gap-2 border border-primary p-2">
              <div className="flex flex-col items-center justify-center w-full h-auto gap-1 text-sm">
                <h1 className="text-md font-bold text-center">{key}</h1>
                <DevToolExample />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default DevToolsPage;
