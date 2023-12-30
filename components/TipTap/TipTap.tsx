'use client'

import { useTipTap } from '@/hooks';
import { Loading, TipTapToolbar } from '@/components';
import { cn } from '@/utils';
import { EditorContent, EditorOptions } from '@tiptap/react';
import { Suspense } from 'react';

export interface TipTapProps extends Partial<EditorOptions> {
  children?: any;
  content?: string;
  className?: string;
  extensions?: any[];
  toolbar?: boolean;
}

export const TipTap = (props: TipTapProps) => {
  const {
    toolbar=true,
  } = props;
  const { editor } = useTipTap(props);

  if (!editor) {
    return <Loading />;
  }
  return (
    <div className="relative flex flex-col w-full h-full border border-primary rounded-sm bg-secondary">
    {toolbar && <TipTapToolbar editor={editor}/>}
    <div className={cn("relative flex w-auto h-full p-4 overflow-y-auto overflow-x-hidden justify-center")}>
      <Suspense fallback={<Loading />}>
        <EditorContent editor={editor} />
      </Suspense>
    </div>
    </div>
  );
};

