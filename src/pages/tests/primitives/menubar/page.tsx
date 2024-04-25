import { Icon } from '@/components/Primitives/Icons/Icon';
import { Menubar } from '@/components/Primitives/Menubar';

const MenubarMenus: any[] = [
  {
    children: 'File',
    icon: <Icon set="Carbon" icon="Document" height="100%" />,
    items: [
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
    ],
  },
  {
    children: 'Edit',
    items: [
      {
        children: 'Undo',
        shortcut: '⌘Z',
      },
      {
        children: 'Redo',
        shortcut: '⌘Y',
      },
      { type: 'separator' },
      {
        children: 'Cut',
        shortcut: '⌘X',
      },
      {
        children: 'Copy',
        shortcut: '⌘C',
      },
      {
        children: 'Paste',
        shortcut: '⌘V',
      },
    ],
  },
];

const MenubarCode = ` `;

const MenubarPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex justify-center gap-2 w-[300px] p-4 border border-primary">
        <Menubar items={MenubarMenus} />
      </div>
    </div>
  );
};

export default MenubarPage;
