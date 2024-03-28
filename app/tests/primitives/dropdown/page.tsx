'use client';

import { DropdownMenu } from '@/components';

const DropdownMenuPage = () => {
  const DropdownItems: any[] = [
    { children: 'New Tab', shortcut: '⌘T', type: 'item' },
    { children: 'New Window', shortcut: '⌘N', type: 'item' },
    { children: 'New Incognito Window', disabled: true, type: 'item' },
    { children: 'Random', shortcut: '⌘R', type: 'item' },
    { children: 'Close Window', shortcut: '⌘W', type: 'item' },
    { type: 'separator' },
    { type: 'label', children: 'Open' },
    {
      type: 'sub',
      children: 'Open File',
      shortcut: '⌘O',
      items: [
        { children: 'File', type: 'item' },
        { children: 'Folder', type: 'item' },
      ],
    },
    { type: 'checkbox', children: 'Checkbox' },
    { type: 'checkbox', children: 'Checked', checked: true },
    { type: 'radio', children: 'Radio', items: [{ children: 'Radio 1' }, { children: 'Radio 2' }, { children: 'Radio 3' }] },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex justify-center gap-2 p-4">
        <DropdownMenu items={DropdownItems}>Open</DropdownMenu>
      </div>
      {/* <div className="flex justify-center gap-2 p-4">
      <PreviewNodeDropdown html={'<div>Hello World</div>'} uploadUrl={'https://google.com'} />
    </div> */}
    </div>
  );
};

export default DropdownMenuPage;
