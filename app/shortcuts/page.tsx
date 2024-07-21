'use client';


import { HotkeysGuide } from '@/components/Hotkeys/Hotkeys';
import { Hotkey } from '@/hooks/useHotkeys';
import { META_MAC } from '@/utils';

const HotkeysPage = () => {
  const hotkeys: Hotkey[] = [
    {
      key: `${META_MAC}+k`,
      action: () => console.log('Command palette opened'),
      options: {
        description: 'Open command palette',
        scopes: ['*'],
      },
    },
    {
      key: `${META_MAC}+d`,
      action: () => console.log('Toggle debug'),
      options: {
        description: 'Toggle debug',
        scopes: ['*'],
      },
    },
    {
      key: `${META_MAC}+s`,
      action: () => console.log('File saved'),
      options: {
        description: 'Save file',
      },
    },
    {
      key: `${META_MAC}+z`,
      action: () => console.log('Undo'),
      options: {
        description: 'Undo',
        scopes: ['editor', 'input'],
      },
    },
    {
      key: `cmd+shift+z`,
      action: () => console.log('Redo'),
      options: {
        description: 'Redo',
        scopes: ['editor', 'input'],
      },
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <HotkeysGuide hotkeys={hotkeys} />
    </div>
  );
};

export default HotkeysPage;
