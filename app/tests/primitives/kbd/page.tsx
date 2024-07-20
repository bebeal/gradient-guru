'use client';

import { Kbd } from '@/components';

const KbdPage = () => {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-primary text-primary gap-10">
      <div className="flex flex-col items-center justify-center gap-4 text-sm">
        <Kbd clickToCopy>Q</Kbd>
        <Kbd clickToCopy>⌥⇧W</Kbd>
        <Kbd clickToCopy>⌘⇧Z</Kbd>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-md">
        <Kbd clickToCopy>Q</Kbd>
        <Kbd clickToCopy>⌥⇧W</Kbd>
        <Kbd clickToCopy>⌘⇧Z</Kbd>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-lg">
        <Kbd clickToCopy>Q</Kbd>
        <Kbd clickToCopy>⌥⇧W</Kbd>
        <Kbd clickToCopy>⌘⇧Z</Kbd>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-xl">
        <Kbd clickToCopy>Q</Kbd>
        <Kbd clickToCopy>⌥⇧W</Kbd>
        <Kbd clickToCopy>⌘⇧Z</Kbd>
      </div>
    </div>
  );
};

export default KbdPage;
