'use client';

import { ReactNode, useEffect, useState } from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '@/utils';

export interface HoverCardProps extends HoverCardPrimitive.HoverCardProps {
  content: ReactNode;
  sideOffset?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  contentStyle?: any;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  content,
  openDelay = 0,
  closeDelay = 100,
  sideOffset = 4,
  side = 'top',
  contentStyle = {
    maxWidth: 'max(200px, var(--radix-hover-card-trigger-width))',
    maxHeight: 'var(--radix-hover-card-content-available-height)',
  },
  className = '',
  ...rest
}) => {
  const [tooltipContent, setTooltipContent] = useState<ReactNode>(content);

  useEffect(() => {
    setTooltipContent(content);
  }, [content]);

  return (
    <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} {...rest}>
      <HoverCardPrimitive.Trigger asChild>
        <div className={cn('flex h-full w-full items-center justify-center leading-none', 'cursor-help')}>{children}</div>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          sideOffset={sideOffset}
          side={side}
          collisionPadding={20}
          sticky="always"
          className={cn(
            'w-auto h-auto flex-1 radix-side-top:animate-slide-down-fade',
            'radix-side-right:animate-slide-left-fade',
            'radix-side-bottom:animate-slide-up-fade',
            'radix-side-left:animate-slide-right-fade',
            'drop-shadow-xl',
            'fade-in-0 zoom-in-95',
            'rounded-md border bg-secondary px-3 py-1.5 text-sm text-secondary shadow-md',
            'pointer-events-auto cursor-default',
          )}
        >
          <HoverCardPrimitive.Arrow className={cn('fill-current text-primary')} />
          <div className={cn('flex text-xs leading-none text-primary break-words overflow-auto w-auto', className)} style={contentStyle}>
            {tooltipContent}
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};

HoverCard.displayName = 'HoverCard';
