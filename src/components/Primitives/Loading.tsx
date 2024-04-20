import { cn } from '@/utils/utils';
import { Icon } from './Icons';

export interface LoadingProps {
  spinner?: boolean;
  dots?: boolean;
  text?: string;
  children?: any;
}
export const Loading = (props: LoadingProps) => {
  const { spinner = true, dots = false, children, text } = props;
  const content = children ? children : text;

  return (
    <div className="w-auto h-auto flex items-center justify-center text-xl text-muted gap-1">
      {spinner && <Icon set="Custom" icon="Loader" className={cn('flex items-center justify-center h-6 w-6 text-base gap-1')} />}
      {content}
      {dots && <Icon set="Custom" icon="DotsLoader" className={'h-6 w-6 self-end'} />}
    </div>
  );
};
