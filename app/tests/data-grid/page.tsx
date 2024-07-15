'use client'

import { LinkList } from "@/components";

const DataGridsPage = () => {
  const title = 'DataGridsPage';
  // const pages: string[] = ['client-side', 'infinite', 'server-side', 'viewport'];
  const pages: string[] = ['pokemonDB'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <LinkList links={pages} prefix="/tests/data-grid/" />
    </div>
  );
};

export default DataGridsPage;
