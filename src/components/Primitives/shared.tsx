import { cn } from '@/utils/utils';

import { Icon } from './Icons';

export type ErrorMessage = { message?: string; stack?: string; title?: string };
export interface ErroringProps {
  children?: any;
  error?: ErrorMessage | string;
  className?: string;
}
export const Erroring = (props: ErroringProps) => {
  const { children, error = { title: 'Error: ', message: 'Something went wrong' }, className } = props;

  return (
    <div className={cn('w-auto h-auto flex flex-col items-center justify-center text-error gap-2 text-xl', className)}>
      <div className="w-full h-auto flex text-sm gap-1">
        <Icon set="Carbon" icon="StatusPartialFail" className={'flex items-center justify-center h-full w-auto'} />
        {typeof error === 'string' ? 'Error' : error?.title}
      </div>
      {children ? children : <div className={cn(`text-xs`)}>{typeof error === 'string' ? error : error?.message}</div>}
    </div>
  );
};

export const Success = (props: { children?: any; className?: string }) => {
  const { children, className } = props;

  return (
    <div className={cn('w-auto h-auto flex items-center justify-center text-green-500 gap-2 text-xl', className)}>
      <Icon set="Carbon" icon="StatusResolved" className={'flex items-center justify-center h-full w-auto'} />
      {children}
    </div>
  );
};

export interface UnderConstructionProps {
  className?: string;
}
export const UnderConstruction = (props: UnderConstructionProps) => {
  const { className = '' } = props;
  return (
    <div className={cn('absolute w-full h-full flex justify-center items-center rounded-lg pointer-events-none overflow-visible', className)}>
      <div className="absolute w-full h-full left-0 top-0 bg-black opacity-50 rounded-lg pointer-events-none overflow-visible z-[9]" />
      <div className="top-0 left-1/2 -translate-x-1/2 bg-primary text-primary shadow-2xl shadow-black text-base px-1 py-1 rounded-lg border-2 border-solid border-primary animate-grow w-full z-[10] text-center [transform:scale(0.85)]">
        🚧 Under Construction 🚧
      </div>
    </div>
  );
};
