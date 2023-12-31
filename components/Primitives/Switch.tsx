'use client'

import { cn, noop } from '@/utils';
// ref: https://github.com/saadeghi/daisyui/blob/35dbea89ca5b82dd0c3ba4bb69d5f39a7b7c4d54/src/components/styled/toggle.css#L2

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { forwardRef, useState, useEffect, useCallback } from 'react';

// export interface SwitchProps extends TogglePrimitive.ToggleProps {
export interface SwitchProps {
  id?: string;
  handleOffset?: string;
  baseColor?: string;
  animationTime?: string;
  pressed?: boolean | undefined;
  onChange?: (event: any) => void;
  className?: string;
  disabled?: boolean;
  name?: string;
  defaultPressed?: boolean | undefined;
  onPressedChange?: (pressed: boolean) => void;
  offLabel?: any;
  onLabel?: any;
  children?: React.ReactNode;
  asChild?: boolean;
  readOnly?: boolean;
}

export const Switch = forwardRef<any, SwitchProps>((props, ref) => {
  const {
    id,
    pressed: externalPressed,
    defaultPressed = undefined,
    disabled = false,
    onPressedChange: onPressedChangeCallback,
    onChange: onChangeCallback,
    handleOffset = '1.25rem',
    animationTime = '0.2s',
    className,
    offLabel,
    onLabel,
    children,
    asChild,
    readOnly=false,
    ...rest
  } = props;
  const [internalPressed, setInternalPressed] = useState<boolean | undefined>(defaultPressed);
  const isPressed = externalPressed !== undefined ? externalPressed : internalPressed;

  useEffect(() => {
    if (externalPressed !== undefined) {
      setInternalPressed(externalPressed);
    }
  }, [externalPressed]);

   // radix doesn't expose the actual event so we have to create a synthetic one for it to work with react-hook-form
   const onChange = useCallback((pressed: boolean) => {
    // synthetic event
    const event: any = {
      target: {
        value: pressed,
        name: rest?.name,
        type: 'button',
      },
    };
    onChangeCallback?.(event);
   }, [onChangeCallback, rest?.name]);

   const onPressedChange = useCallback(() => {
    const newPressed = isPressed === undefined ? true : !isPressed;
    setInternalPressed(newPressed);
    onPressedChangeCallback && onPressedChangeCallback?.(newPressed);
    onChange?.(newPressed);
   }, [isPressed, onPressedChangeCallback, onChange]);

  const onClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onPressedChange();
  }, [onPressedChange]);

  const baseColor = isPressed === undefined ? 'rgba(80, 80, 80, 0.7)' : isPressed ? 'rgba(0, 140, 255, 1)' : 'rgba(80, 80, 80, 0.7)';
  const thumbColor = isPressed === undefined ? 'rgb(255, 255, 255)' : isPressed ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)';
  const style: any = {
    transition: `background, box-shadow ${animationTime} ease-out`,
    boxShadow: isPressed === undefined
                ? `calc(${handleOffset} / 2) 0 0 2px ${baseColor} inset, calc(${handleOffset} / -2) 0 0 2px ${baseColor} inset, 0 0 0 2px ${baseColor} inset`
                : isPressed ? `${handleOffset} 0 0 2px ${baseColor} inset, 0 0 0 2px ${baseColor} inset`
                            : `calc(${handleOffset} * -1) 0 0 2px ${baseColor} inset, 0 0 0 2px ${baseColor} inset`,
    appearance: 'none',
    border: `solid 1px ${thumbColor}`,
    borderRadius: '1.9rem',
    height: '1.25rem',
    width: '2.5rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: thumbColor,
  };

  return (
    <div className={cn("flex w-auto justify-center items-center gap-1", readOnly && 'cursor-default pointer-events-none')}>
      {offLabel && (
        <div className={cn("text-[10px] text-muted break-words text-center w-12", !internalPressed && `text-primary`)}>
          {offLabel}
        </div>
      )}
      <TogglePrimitive.Root
        id={id}
        asChild={asChild}
        ref={ref} className={className} style={style} disabled={disabled}
        pressed={isPressed}
        {...rest}
        onChange={noop}
        onClick={onClick}
        onPressedChange={onPressedChange}
      >{children}</TogglePrimitive.Root>
      {onLabel && (
        <div className={cn("text-[10px] text-muted break-words text-center w-12", internalPressed && `text-primary`)}>
          {onLabel}
        </div>
      )}
      </div>
  );
});
