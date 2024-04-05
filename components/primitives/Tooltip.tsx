'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/utils';

export interface TooltipProps extends TooltipPrimitive.TooltipProps {
  content?: any;
  sideOffset?: number;
  className?: string;
}

export const Tooltip = (props: TooltipProps) => {
  const { children, content = '', delayDuration = 10, sideOffset = 4, className = '', ...rest } = props;
  const [tooltipContent, setTooltipContent] = useState<any>(content);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTooltipContent(content);
  }, [content]);

  const onPointerDownOutside = useCallback((event: any) => {
    if (event.target === triggerRef.current) event.preventDefault();
  }, []);

  const onPointerDown = useCallback((event: any) => {
    event.preventDefault();
  }, []);

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root {...rest}>
        <TooltipPrimitive.Trigger ref={triggerRef} asChild className={className} onPointerDown={onPointerDown}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            onPointerDownOutside={onPointerDownOutside}
            sideOffset={sideOffset}
            sticky="always"
            className={cn(
              'w-auto h-auto flex-1 radix-side-top:animate-fade-down',
              'radix-side-right:animate-fade-left',
              'radix-side-bottom:animate-fade-up',
              'radix-side-left:animate-fade-right',
              'drop-shadow-xl',
              'fade-in-0 zoom-in-95',
              'rounded-md border bg-secondary px-3 py-1.5 text-sm text-secondary shadow-md',
              'pointer-events-auto cursor-default',
            )}
          >
            <TooltipPrimitive.Arrow className={cn('fill-current text-primary')} />
            <div className="block text-xs leading-none text-primary">{tooltipContent}</div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
