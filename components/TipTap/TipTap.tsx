'use client'

import { useTipTap } from '@/hooks';
import { Loading, TipTapToolbar } from '@/components';
import { cn } from '@/utils';
import { EditorContent, EditorOptions } from '@tiptap/react';
import { Suspense, useRef } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);
  const { editor } = useTipTap(props);

  if (!editor) {
    return <Loading />;
  }
  return (
    <div ref={ref} className="relative flex flex-col w-full h-full border border-primary rounded-sm bg-secondary">
      <Suspense fallback={<Loading />}>
        {toolbar && <TipTapToolbar editor={editor}/>}
        <div id="tiptap-content" className={cn("relative flex w-full h-full overflow-y-auto overflow-x-hidden justify-center")}>
          <EditorContent editor={editor} />
        </div>
      </Suspense>
    </div>
  );
};

