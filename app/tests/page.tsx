'use client';

import { DirectoryTree, LinkList } from '@/components';

const TestsPage = () => {
  const tests = {
    'tests/': ['assets', 'auth', 'auto-form', 'buttons', 'directory-tree', 'icon-sets', 'mdx', 'primitives', 'radix-themed-components', 'random', 'styled-components', 'syntax-highlighter', 'tailwindcss', 'terminal', 'tldraw'],
  };

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="flex border border-primary rounded-md p-4 h-auto min-w-[300px]">
        <DirectoryTree data={tests} />
      </div>
    </div>
  );
};

export default TestsPage;
