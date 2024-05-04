import React, { forwardRef, useCallback } from 'react';
import * as PanelPrimitive from '@radix-ui/react-accordion';
import { useRippleEffect } from '@/hooks/useRippleEffect';
import { cn } from '@/utils/utils';
import { Icon } from './Icons/Icon';

export enum Direction {
  up = 'up',
  left = 'left',
  right = 'right',
  down = 'down',
}

export interface PanelProps {
  children?: React.ReactNode;
  direction?: Direction;
  ripple?: boolean;
  className?: string;
}

export const Panel = forwardRef((props: PanelProps, ref?: any) => {
  const { children, direction = Direction.right, ripple = true, className = '' } = props;
  const [value, setValue] = React.useState<string[]>([]);
  const [hovered, setHovered] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const { createRippleEffect } = useRippleEffect();

  const onValueChange = useCallback(
    (event: any, newValue: string) => {
      ripple && createRippleEffect?.(event);
      value.includes(newValue as any) ? setValue((value as any).filter((v: string) => v !== newValue)) : setValue([...(value as any), newValue]);
    },
    [ripple, createRippleEffect, value],
  );

  const baseClasses = {
    [Direction.up]: 'rounded-b-none',
    [Direction.left]: 'rounded-r-none',
    [Direction.right]: 'rounded-l-none',
    [Direction.down]: 'rounded-t-none',
  }[direction];

  const borderClasses = {
    [Direction.up]: 'border-b-transparent',
    [Direction.left]: 'border-r-transparent',
    [Direction.right]: 'border-l-transparent',
    [Direction.down]: 'border-t-transparent',
  }[direction];

  const Content = useCallback(
    (isFirst: boolean = true) => (
      <PanelPrimitive.Item
        value={'item'}
        className={cn(
          'flex overflow-hidden rounded-lg',
          {
            [Direction.up]: 'flex-col-reverse h-full',
            [Direction.left]: 'flex-row-reverse rounded-r-none',
            [Direction.right]: 'flex-row rounded-l-none',
            [Direction.down]: 'flex-col rounded-t-none h-full',
          }[direction],
          baseClasses,
        )}
      >
        <PanelPrimitive.Header
          className={cn(
            'flex',
            {
              [Direction.up]: 'w-full',
              [Direction.left]: 'h-full',
              [Direction.right]: 'h-full',
              [Direction.down]: 'w-full',
            }[direction],
          )}
        >
          <PanelPrimitive.Trigger
            onClick={(e) => onValueChange(e, 'item')}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
              'group relative overflow-hidden',
              'cursor-pointer text-secondary bg-primary rounded-lg border border-secondary p-2 flex-1 flex items-center justify-center text-lg leading-tight',
              'radix-state-open:border-accent radix-state-open:text-primary min-w-[36px]',
              baseClasses,
              hovered && 'text-accent bg-secondary border-accent',
              !value.includes('item') && borderClasses,
            )}
          >
            <Icon
              set="Carbon"
              icon="ChevronRight"
              className={cn(
                {
                  [Direction.up]: 'rotate-[-270deg] group-radix-state-open:rotate-[-90deg]',
                  [Direction.left]: 'rotate-[-180deg] group-radix-state-open:rotate-0',
                  [Direction.right]: 'rotate-0 group-radix-state-open:rotate-180',
                  [Direction.down]: 'rotate-90 group-radix-state-open:rotate-[270deg]',
                }[direction],
                'transform transition-transform anim-duration-200 ease-in-out',
              )}
            />
          </PanelPrimitive.Trigger>
        </PanelPrimitive.Header>
        <PanelPrimitive.Content
          ref={contentRef}
          className={cn(
            'overflow-hidden text-primary cursor-default border border-accent transition-all left-0 top-0',
            isFirst ? 'order-first' : 'order-last',
            {
              [Direction.up]: 'radix-state-closed:animate-accordion-down radix-state-open:animate-accordion-up border-t-transparent',
              [Direction.left]: 'radix-state-closed:animate-accordion-in radix-state-open:animate-accordion-out border-l-transparent',
              [Direction.right]: 'radix-state-closed:animate-accordion-out radix-state-open:animate-accordion-in border-r-transparent',
              [Direction.down]: 'radix-state-closed:animate-accordion-up radix-state-open:animate-accordion-down border-b-transparent',
            }[direction],
          )}
        >
          {children}
        </PanelPrimitive.Content>
      </PanelPrimitive.Item>
    ),
    [baseClasses, borderClasses, children, direction, hovered, onValueChange, value],
  );

  return (
    <PanelPrimitive.Root
      ref={ref}
      {...props}
      type={'multiple'}
      className={cn(
        'flex bg-primary text-primary overflow-hidden pointer-events-auto relative',
        {
          [Direction.up]: 'flex-col h-full rounded-b-lg',
          [Direction.left]: 'flex-row-reverse h-full rounded-l-lg',
          [Direction.right]: 'flex-row h-full rounded-r-lg',
          [Direction.down]: 'flex-col justify-end h-full rounded-t-lg',
        }[direction],
        className,
      )}
    >
      {Content(true)}
    </PanelPrimitive.Root>
  );
});
