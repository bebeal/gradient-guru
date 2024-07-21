'use client';

import { DirectoryTree } from '@/components';

const PrimitivesPage = () => {
  const primitives = {
    'primitives/': ['accordion', 'card', 'checkbox', 'dropdown', 'kbd', 'menubar', 'progress', 'select', 'side-panel', 'slider', 'switch', 'textarea', 'toasts', 'tooltip'],
  };

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="flex border border-primary rounded-md p-4 h-auto min-w-[300px]">
        <DirectoryTree data={primitives} />
      </div>
    </div>
  );
};

export default PrimitivesPage;
