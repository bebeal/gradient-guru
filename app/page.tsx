'use client'

import { LinkList } from "@/components";

const AppPage = () => {
  const title = 'Root App Page';
  const pages: string[] = ['tests'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <LinkList links={pages} prefix="/" />
    </div>
  );
};

export default AppPage;
