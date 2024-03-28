'use client';

import { useState } from 'react';
import { Switch } from '@/components';

const SwitchPage = () => {
  const [value, setValue] = useState<boolean | undefined>(undefined);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-auto bg-primary text-primary gap-2">
      <div className="flex flex-col gap-2 w-full h-auto justify-center items-center">
        <span className="text-gray-600 w-auto h-auto justify-center items-center">Off</span>
        <Switch pressed={value} onPressedChange={setValue} />
        <span className="text-gray-600 w-auto h-auto justify-center items-center">On</span>
      </div>
    </div>
  );
};

export default SwitchPage;
