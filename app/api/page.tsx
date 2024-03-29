'use client'

import { LinkList } from "@/components";

const APIPage = () => {
  const title = 'APIs';
  const apis: string[] = ['/auth/signin', '/auth/signout'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <LinkList links={apis} prefix="/api" />
    </div>
  );
};

export default APIPage;
