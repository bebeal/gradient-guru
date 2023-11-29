'use client'

import { Switch } from "@/components";
import { useState } from "react";

const SwitchPage = () => {
  const [value, setValue] = useState<boolean | undefined>(undefined);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex items-center justify-center gap-2">
        <span className="text-gray-600 w-auto h-auto justify-center items-center">Off</span>
        <Switch pressed={value} onPressedChange={setValue} />
        <span className="text-gray-600 w-auto h-auto justify-center items-center">On</span>
      </div>
    </div>
  )
};

export default SwitchPage;

