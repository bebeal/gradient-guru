import { forwardRef, ReactNode } from 'react';
import { cn } from '@/utils';


export const Icon = (Ico: any, label: string = '', defaultProps: any) => {
  return forwardRef<any, any>((props?: any, ref?: any): ReactNode => {
    defaultProps = { width: '1em', height: '100%', fill: 'currentColor', stroke: 'none', ...defaultProps };
    const merged = { ...defaultProps, ...props };
    return (
      <Ico ref={ref} label={label} {...merged} />
    );
  });
};

export interface IconLinkProps {
  Ico?: any;
  href?: string;
  label?: string;
  className?: string;
}

export const IconLink = forwardRef<any, IconLinkProps>((props, ref?) => {
  const { Ico, href, label, className } = props;
  return (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className={cn("w-full flex gap-1 items-center", className)}>
      <Ico className="w-auto h-3.5" />
      {label && label.length > 0 && <div className="text-primary hover:underline text-xs">{label}</div>}
    </a>
  );
});
