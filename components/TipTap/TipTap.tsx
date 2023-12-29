'use client'

import { useTipTap } from '@/hooks';
import { Loading } from '@/components';
import { cn } from '@/utils';
import { EditorContent } from '@tiptap/react';
import { Suspense } from 'react';

export interface TipTapProps {
  children?: any;
  content?: string;
  className?: string;
  extensions?: any[];
}

export const TipTap = (props: TipTapProps) => {
  const { editor } = useTipTap(props);

  if (!editor) {
    return <Loading />;
  }
  return (
    <div className={cn("relative flex w-full h-full p-4 overflow-y-auto overflow-x-hidden justify-center")}>
      <Suspense fallback={<Loading />}>
        <EditorContent editor={editor} />
      </Suspense>
    </div>
  );
};

