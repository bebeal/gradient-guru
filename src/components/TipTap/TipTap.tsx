import { memo, Suspense, useRef } from 'react';
import { Loading } from '@/components/Primitives/Loading';
import { useTipTap } from '@/hooks/useTipTap';
import { cn } from '@/utils/utils';
import { TipTapToolbar } from './TipTapToolbar';
import { Content, EditorContent, EditorOptions } from '@tiptap/react';

export interface TipTapProps extends Partial<EditorOptions> {
  children?: any;
  content?: Content | string;
  className?: string;
  extensions?: any[];
  toolbar?: boolean;
}

export const TipTap = memo((props: TipTapProps) => {
  const { toolbar = true } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { editor } = useTipTap(props);

  if (!editor) {
    return <Loading />;
  }
  return (
    <div ref={ref} className="relative flex flex-col w-full h-full border border-primary rounded-sm bg-secondary">
      <Suspense fallback={<Loading />}>
        {toolbar && <TipTapToolbar editor={editor} />}
        <div className={cn('relative flex w-full h-full overflow-y-auto overflow-x-hidden justify-center [&>div]:w-full')}>
          <EditorContent editor={editor} />
        </div>
      </Suspense>
    </div>
  );
});
