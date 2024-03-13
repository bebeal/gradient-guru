'use client'

import { TargetIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { throttle } from "lodash";
import { useState } from "react";

// Test for react-gieger
const ExcessiveRerenderComponent = () => {
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

const DebugPage = () => {
  const title = "Debug Page";
  return (
      <div className="flex flex-col w-auto h-auto justify-center items-center gap-1 p-2 overflow-auto bg-primary">
        <div className="text-2xl font-bold text-center underline">{title}</div>
        <ExcessiveRerenderComponent />
      </div>
  );
};

export default DebugPage;
