'use client';

import React, { useCallback } from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '@/utils';

export interface HoverCardProps extends HoverCardPrimitive.HoverCardProps {
  content: React.ReactNode;
  link?: boolean;
  clickToDismiss?: boolean;
  portal?: boolean;
  sideOffset?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const HoverCard = (props: HoverCardProps) => {
  const { children, content, openDelay = 0, closeDelay = 100, link = false, clickToDismiss = false, sideOffset = 4, side = 'top', ...rest} = props;
  // const [open, setOpen] = useState(false);
  // const timeUpRef = useRef<any>(null);
  // const timeDownRef = useRef<any>(null);
  // const openTimeoutRef = useRef<any>(null);
  // const closeTimeoutRef = useRef<any>(null);

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(openTimeoutRef.current);
  //     clearTimeout(closeTimeoutRef.current);
  //   };
  // }, []);

  // const openCard = useCallback((event?: any) => {
  //   clearTimeout(closeTimeoutRef.current);
  //   openTimeoutRef.current = setTimeout(() => {
  //     setOpen(true);
  //   }, openDelay);
  // }, [openDelay]);

  // const closeCard = useCallback((event?: any) => {
  //   clearTimeout(openTimeoutRef.current);
  //   closeTimeoutRef.current = setTimeout(() => {
  //     setOpen(false);
  //   }, closeDelay);
  // }, [closeDelay]);

  // const handleClick = useCallback((event?: any) => {
  //   event?.preventDefault();
  //   const difference = timeUpRef.current - timeDownRef.current;
  //   // only click to dismiss if the user clicks and releases within 145ms and also ignore if the user is double clicking
  //   // console.log(`difference: ${difference}, length of selected: ${window.getSelection()?.toString()?.length}, event?.detail: ${event?.detail}`);
  //   if (clickToDismiss && difference < 145 && difference > 0 && window.getSelection()?.toString()?.length === 0) {
  //     setOpen(false);
  //   }
  // }, [clickToDismiss]);

  // const handleMouseDown = useCallback(() => {
  //   timeDownRef.current = Date.now().valueOf();
  // }, []);

  // const handleMouseUp = useCallback(() => {
  //   timeUpRef.current = Date.now().valueOf();
  //   // to ignore double clicks
  //   setTimeout(handleClick, 0);
  // }, [handleClick]);

  const handleDoubleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
  }, []);

  return (
    <HoverCardPrimitive.Root
      openDelay={openDelay}
      closeDelay={closeDelay}
      
      {...rest}
    >
      <HoverCardPrimitive.Trigger
        asChild
        // onMouseEnter={openCard}
        // onMouseLeave={closeCard}
      >
        <div className={cn(
          'flex h-auto w-auto items-center justify-center leading-none',
          // link || clickToDismiss ? 'cursor-pointer' : 'cursor-auto', 
          'cursor-help'
        )}>{children}</div>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          // onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
          // onMouseUp={handleMouseUp}
          // onMouseEnter={openCard}
          // onMouseLeave={closeCard}
          sideOffset={sideOffset}
          side={side}
          className={cn(
            'radix-side-top:animate-slide-down-fade',
            'radix-side-right:animate-slide-left-fade',
            'radix-side-bottom:animate-slide-up-fade',
            'radix-side-left:animate-slide-right-fade',
            'drop-shadow-xl',
            'fade-in-0 zoom-in-95',
            'rounded-md border bg-secondary px-3 py-1.5 text-sm text-secondary shadow-md',
            // link || clickToDismiss ? 'cursor-pointer' : 'cursor-auto'
            'pointer-events-none cursor-default'
          )}
        >
          <HoverCardPrimitive.Arrow className={cn('fill-current text-primary')} />
          <div className="block text-xs leading-none text-primary break-words" style={{
            width: 'max(200px, var(--radix-hover-card-trigger-width))',
            maxHeight: 'var(--radix-hover-card-content-available-height)',
          }}>{content}</div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};

HoverCard.displayName = 'HoverCard';
