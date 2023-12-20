'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/utils';

export interface TooltipProps extends TooltipPrimitive.TooltipProps {
  content?: any;
  sideOffset?: number;
  className?: string;
  open?: boolean;
}

export const Tooltip = (props: TooltipProps) => {
  const {
    children,
    content='',
    delayDuration = 10,
    sideOffset = 4,
    className='',
    open,
    ...rest
 } = props;
 const triggerRef = useRef<HTMLButtonElement>(null);
 const [isOpen, setIsOpen] = useState(open || false);

 useEffect(() => {
    setIsOpen(open || false);
  }, [open]);
 
 const onOpenChange = useCallback((newOpen: boolean) => {
   setIsOpen(newOpen);
 }, []);

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={isOpen} onOpenChange={onOpenChange} {...rest}>
        <TooltipPrimitive.Trigger ref={triggerRef} asChild className={className} onPointerDown={(e) => e.preventDefault()}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            onPointerDownOutside={(event) => {
              if (event.target === triggerRef.current) event.preventDefault();
            }}
            sideOffset={sideOffset}
            className={cn(
              "radix-side-top:animate-slide-down-fade",
              "radix-side-right:animate-slide-left-fade",
              "radix-side-bottom:animate-slide-up-fade",
              "radix-side-left:animate-slide-right-fade",
              "fade-in-0 zoom-in-95",
              "overflow-hidden rounded-md border bg-secondary px-3 py-1.5 text-sm text-secondary shadow-md"
            )}
          >
            <TooltipPrimitive.Arrow className={cn("fill-current text-primary")}  />
            <div className="block text-xs leading-none text-primary">
              {content}
            </div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
