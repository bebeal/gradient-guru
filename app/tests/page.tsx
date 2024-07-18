'use client'

import { DirectoryTree, LinkList } from "@/components";

const TestsPage = () => {
  const apis = {
    'tests/': ['assets', 'auth', 'buttons', 'directory-tree', 'fun', 'icon-sets', 'mdx', 'primitives', 'radix-themed-components', 'styled-components', 'syntax-highlighter', 'tailwindcss', 'terminal', 'tiptap', 'tldraw', 'tweet']
  };

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="flex border border-primary rounded-md p-4 h-auto min-w-[300px]">
        <DirectoryTree data={apis} basePath="tests/" />
      </div>
    </div>
  );
};

export default TestsPage;
