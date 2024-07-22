'use client'
import { cn, Variant } from '@/utils';
import React, { HTMLProps, forwardRef } from 'react'
import { Button, ButtonProps } from '../Primitives/Button';
import { Tooltip } from '../Primitives/Tooltip';

export type ToolbarWrapperProps = {
  shouldShowContent?: boolean
  isVertical?: boolean
} & HTMLProps<HTMLDivElement>;

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(
  ({ shouldShowContent = true, children, isVertical = false, className, ...rest }, ref) => {
    const toolbarClassName = cn(
      'text-black inline-flex h-full leading-none gap-0.5',
      isVertical ? 'flex-col p-2' : 'flex-row p-1 items-center',
      className,
    )

    return (
      shouldShowContent && (
        <div className={cn('bg-white rounded-lg dark:bg-black', toolbarClassName)} {...rest} ref={ref}>
          {children}
        </div>
      )
    )
  },
);

ToolbarWrapper.displayName = 'Toolbar'

export type ToolbarDividerProps = {
  horizontal?: boolean
} & HTMLProps<HTMLDivElement>

const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(({ horizontal, className, ...rest }, ref) => {
  const dividerClassName = cn(
    'bg-neutral-200 dark:bg-neutral-800',
    horizontal
      ? 'w-full min-w-[1.5rem] h-[1px] my-1 first:mt-0 last:mt-0'
      : 'h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0',
    className,
  )

  return <div className={dividerClassName} ref={ref} {...rest} />
});
ToolbarDivider.displayName = 'Toolbar.Divider';

export type TipTapToolbarButtonProps = ButtonProps & {
  active?: boolean
  activeClassname?: string
  tooltip?: string
  tooltipShortcut?: string[]
}

const ToolbarButton = forwardRef<HTMLButtonElement, TipTapToolbarButtonProps>(
  (
    { children, variant = 'none', className, tooltip, tooltipShortcut, active, activeClassname, ...rest },
    ref,
  ) => {
    const buttonClass = cn(`flex w-auto h-auto text-primary rounded border border-transparent hover:bg-tertiary hover:border-accent hover:text-accent p-1`, className)

    const content = (
      <Button
        ref={ref}
        className={active ? cn(activeClassname, buttonClass) : buttonClass}
        variant={variant}
        {...rest}
      >
        {children}
      </Button>
    )

    if (tooltip) {
      return (
        <Tooltip content={tooltip}>
          {content}
        </Tooltip>
      )
    }

    return content
  },
);
ToolbarButton.displayName = 'ToolbarButton';

export const TipTapToolbar = {
  Wrapper: ToolbarWrapper,
  Divider: ToolbarDivider,
  Button: ToolbarButton,
};
