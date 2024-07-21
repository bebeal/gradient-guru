'use client';

import React from 'react';
import { ShortcutsGuide } from '@/components/Shortcuts/Shortcuts';
import { Shortcut } from '@/hooks/useShortcuts';
import { META_MAC } from '@/utils';

const ShortcutsPage = () => {
  const shortcuts: Shortcut[] = [
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
      <ShortcutsGuide shortcuts={shortcuts} />
    </div>
  );
};

export default ShortcutsPage;
