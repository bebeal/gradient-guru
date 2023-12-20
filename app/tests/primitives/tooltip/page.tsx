'use client'

import { HoverCard, Tooltip } from "@/components";

const TooltipPage = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex items-center justify-center gap-2">
        <Tooltip content="Test">
          <button className="w-auto h-auto justify-center items-center">Test</button>
        </Tooltip>
      </div>
      <div className="flex items-center justify-center gap-2">
        <HoverCard content="Test">
          <button className="w-auto h-auto justify-center items-center">Test</button>
        </HoverCard>
      </div>
      </div>
    </div>
  )
};

export default TooltipPage;

