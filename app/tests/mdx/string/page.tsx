'use client';

import { markdownString } from '@/app/demos/tiptap/markdown';
import { MDXLayout } from '@/components';

const MDXStringPage = ({ params }: any) => {
  const page = {
    children: markdownString,
  };
  return <MDXLayout {...page} />;
};

export default MDXStringPage;
