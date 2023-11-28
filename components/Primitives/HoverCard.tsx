'use client'

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils';


export interface HoverCardProps extends HoverCardPrimitive.HoverCardProps {
  content: React.ReactNode;
  ringColor?: string;
  link?: boolean;
  clickToDismiss?: boolean;
  portal?: boolean;
};

export const HoverCard = (props: HoverCardProps) => {
  const { 
    children, 
    content, 
    ringColor='accent',
    openDelay=0,
    closeDelay=200,
    link=false,
    clickToDismiss=false,
    portal=true,
  } = props;
  const [open, setOpen] = useState(false);
  const timeUpRef = useRef<any>(null);
  const timeDownRef = useRef<any>(null);
  const openTimeoutRef = useRef<any>(null);
  const closeTimeoutRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      clearTimeout(openTimeoutRef.current);
      clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const openCard = useCallback((event?: any) => {
    clearTimeout(closeTimeoutRef.current);
    openTimeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, openDelay);
  }, [openDelay]);

  const closeCard = useCallback((event?: any) => {
    clearTimeout(openTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }, [closeDelay]);

  const handleClick = useCallback((event?: any) => {
    event?.preventDefault();
    const difference = timeUpRef.current - timeDownRef.current;
    // only click to dismiss if the user clicks and releases within 145ms and also ignore if the user is double clicking
    // console.log(`difference: ${difference}, length of selected: ${window.getSelection()?.toString()?.length}, event?.detail: ${event?.detail}`);
    if (clickToDismiss && difference < 145 && difference > 0 && window.getSelection()?.toString()?.length === 0) {
      setOpen(false);
    };
  }, [clickToDismiss]);

  const handleMouseDown = useCallback(() => {
    timeDownRef.current = Date.now().valueOf();
  }, []);

  const handleMouseUp = useCallback(() => {
    timeUpRef.current = Date.now().valueOf();
    // to ignore double clicks
    setTimeout(handleClick, 0);
  }, [handleClick]);

  const handleDoubleClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const HoverCardContent = useCallback(() => {
    const hoverCardContent = (
      <HoverCardPrimitive.Content
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleMouseUp}
      onMouseEnter={openCard}
      onMouseLeave={closeCard}
      align="center"
      sideOffset={4}
      className={cn(
        "radix-side-top:animate-slide-up-fade radix-side-bottom:animate-slide-down-fade",
        link || clickToDismiss ? 'cursor-pointer' : 'cursor-auto',
        "rounded-lg p-2 drop-shadow-xl",
        "bg-primary",
        `focus:outline-none focus-visible:ring focus-visible:ring-${ringColor} focus-visible:ring-opacity-75`,
        `text-xs`,
      )}
    >
      <HoverCardPrimitive.Arrow className="fill-primary" />
      {content}
      </HoverCardPrimitive.Content>
    )
    if (portal) {
      return (
        <HoverCardPrimitive.Portal>
          {hoverCardContent}
        </HoverCardPrimitive.Portal>
      )
    }
    return hoverCardContent;
  }, [content, link, clickToDismiss, portal, ringColor, closeCard, openCard, handleMouseDown, handleMouseUp]);

  return (
    <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} open={open}>
      <HoverCardPrimitive.Trigger asChild onMouseEnter={openCard} onMouseLeave={closeCard}>
        <div
          className={cn(
            "flex h-auto w-auto items-center justify-center rounded-full",
            link || clickToDismiss ? 'cursor-pointer' : 'cursor-auto',
          )}
        >
          {children}
        </div>
      </HoverCardPrimitive.Trigger>
      <HoverCardContent />
    </HoverCardPrimitive.Root>
  )
};

HoverCard.displayName = 'HoverCard';
