
import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/utils';

export interface TooltipProps extends TooltipPrimitive.TooltipProps {
  content?: any;
  sideOffset?: number;
  className?: string;
}

export const Tooltip = (props: TooltipProps) => {
  const {
    children,
    content='',
    delayDuration = 0,
    sideOffset = 4,
    className='',
 } = props;
 
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild className={className}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={sideOffset}
          className={cn(
            "radix-side-top:animate-slide-down-fade",
            "radix-side-right:animate-slide-left-fade",
            "radix-side-bottom:animate-slide-up-fade",
            "radix-side-left:animate-slide-right-fade",
            "z-50 overflow-hidden rounded-md border bg-secondary px-3 py-1.5 text-sm text-secondary shadow-md animate-in fade-in-0 zoom-in-95"
          )}
        >
          <TooltipPrimitive.Arrow className="fill-current text-primary" />
          <div className="block text-xs leading-none text-primary">
            {content}
          </div>
        </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
