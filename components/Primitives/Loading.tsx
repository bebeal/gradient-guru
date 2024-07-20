import { cn } from '@/utils';
import { Icon } from './Icons';

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
    <div className={cn("w-auto h-auto flex items-center justify-center text-xl text-muted gap-1", className)}>
      {spinner && <Icon set="Custom" icon="Loader" className={cn('flex items-center justify-center h-6 w-6 text-base gap-1')} />}
      {content}
      {dots && <Icon set="Custom" icon="DotsLoader" className={'h-6 w-6 self-end'} />}
    </div>
  );
};
