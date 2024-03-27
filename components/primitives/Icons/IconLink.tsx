import { cn } from "@/utils";
import { forwardRef } from "react";

export interface IconLinkProps {
  icon?: any;
  href?: string;
  label?: string;
  className?: string;
}

export const IconLink = forwardRef<any, IconLinkProps>((props, ref?) => {
  const { icon: Ico, href, label, className } = props;
  return (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" className={cn('w-full flex gap-1 items-center', className)}>
      <Ico className="w-auto h-3.5" />
      {label && label.length > 0 && <div className="text-primary hover:underline text-xs">{label}</div>}
    </a>
  );
});
