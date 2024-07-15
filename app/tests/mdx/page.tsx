'use client'

import { LinkList, Separator } from "@/components";

const MDXPage = () => {
  const title = 'Tests';
  const pages: string[] = ['raw', 'string'];
  const slugs = ['example'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <LinkList links={pages} prefix="/tests/mdx/" />
      <Separator />
      Slugs in public/mdx:
      <LinkList links={slugs} prefix="/tests/mdx/" textMap={{'example': 'public/mdx/example.mdx'}} />
    </div>
  );
};

export default MDXPage;
