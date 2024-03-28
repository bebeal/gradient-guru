'use client';

import { useState } from 'react';
import { Kbd } from '@/components';

const KbdPage = () => {
  const [value, setValue] = useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-primary text-primary gap-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <Kbd className="text-[6px]">Q</Kbd>
        <Kbd className="text-[6px]">⌥⇧W</Kbd>
        <Kbd className="text-[6px]">⌘⇧Z</Kbd>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <Kbd className="">Q</Kbd>
        <Kbd className="">⌥⇧W</Kbd>
        <Kbd className="">⌘⇧Z</Kbd>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <Kbd className="text-[14px]">Q</Kbd>
        <Kbd className="text-[14px]">⌥⇧W</Kbd>
        <Kbd className="text-[14px]">⌘⇧Z</Kbd>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <Kbd className="text-[18px]">Q</Kbd>
        <Kbd className="text-[18px]">⌥⇧W</Kbd>
        <Kbd className="text-[18px]">⌘⇧Z</Kbd>
      </div>
    </div>
  );
};

export default KbdPage;
