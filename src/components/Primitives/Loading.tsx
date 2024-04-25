import { Loader } from '@/components/Primitives/Icons/IconSets/Custom';
import { cn } from '@/utils/utils';

export interface LoadingProps {
  spinner?: boolean;
  dots?: boolean;
  text?: string;
  children?: any;
  className?: string;
}
export const Loading = (props: LoadingProps) => {
  const { spinner = true, dots = false, children, text, className } = props;
  const content = children ? children : text;

  return (
    <div className={cn('w-auto h-auto flex items-center justify-center text-xl text-muted gap-1', className)}>
      {spinner && <Loader className="flex items-center justify-center h-6 w-6 text-base gap-1" />}
      {content}
      {dots && <Loader className="h-6 w-6 text-base gap-1 self-end" />}
    </div>
  );
};
