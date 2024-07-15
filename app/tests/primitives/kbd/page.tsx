'use client';

import { Kbd } from '@/components';

const KbdPage = () => {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-primary text-primary gap-10">
      <div className="flex flex-col items-center justify-center gap-4 text-sm">
        <Kbd popup>Q</Kbd>
        <Kbd popup>⌥⇧W</Kbd>
        <Kbd popup>⌘⇧Z</Kbd>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-md">
        <Kbd popup>Q</Kbd>
        <Kbd popup>⌥⇧W</Kbd>
        <Kbd popup>⌘⇧Z</Kbd>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-lg">
        <Kbd popup>Q</Kbd>
        <Kbd popup>⌥⇧W</Kbd>
        <Kbd popup>⌘⇧Z</Kbd>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 text-xl">
        <Kbd popup>Q</Kbd>
        <Kbd popup>⌥⇧W</Kbd>
        <Kbd popup>⌘⇧Z</Kbd>
      </div>
    </div>
  );
};

export default KbdPage;
