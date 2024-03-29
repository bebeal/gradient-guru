'use client'

import { LinkList } from "@/components";

const PrimitivesPage = () => {
  const title = 'Primitives';
  const pages: string[] = ['accordion', 'card', 'checkbox', 'dropdown', 'kbd', 'menubar', 'progress', 'select', 'side-panel', 'slider', 'switch', 'textarea', 'tooltip'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <LinkList links={pages} prefix="/tests/primitives/" />
    </div>
  );
};

export default PrimitivesPage;
