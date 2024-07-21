'use client';

import { MDXLayout } from '@/components';
import { markdownString } from '../../tiptap/markdown';

const MDXStringPage = ({ params }: any) => {
  const page = {
    children: markdownString,
  };
  return <MDXLayout {...page} />;
};

export default MDXStringPage;
