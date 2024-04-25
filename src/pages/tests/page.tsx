import { LinkList } from '@/components/Links/LinkList';

// Generate links to all other test pages from here
const Tests = () => {
  // TODO: dynamically fetch this? then just provide a way to filter it for easy control
  const title = 'Tests';
  const pages: string[] = [
    'assets',
    'buttons',
    'data-grid',
    'devtools',
    'fun',
    'google-drive',
    'icon-sets',
    'plotly',
    'primitives',
    'radix-themed-components',
    'styled-components',
    'syntax-highlighter',
    'tailwindcss',
    'terminal',
    'tiptap',
    'tldraw',
    'tweet',
  ];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <LinkList links={pages} prefix="/tests/" />
    </div>
  );
};

export default Tests;
