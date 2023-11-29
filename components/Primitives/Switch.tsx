// ref: https://github.com/saadeghi/daisyui/blob/35dbea89ca5b82dd0c3ba4bb69d5f39a7b7c4d54/src/components/styled/toggle.css#L2

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { forwardRef, useState, useEffect } from 'react';

export interface SwitchProps extends TogglePrimitive.ToggleProps {
  handleOffset?: string;
  baseColor?: string;
  animationTime?: string;
  pressed?: boolean | undefined;
  className?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    pressed: externalPressed,
    defaultPressed = undefined,
    disabled = false,
    onPressedChange,
    handleOffset = '1.5rem',
    animationTime = '0.2s',
    className,
  } = props;

  const [internalPressed, setInternalPressed] = useState<boolean | undefined>(defaultPressed);
  const isPressed = externalPressed !== undefined ? externalPressed : internalPressed;

  useEffect(() => {
    if (externalPressed !== undefined) {
      setInternalPressed(externalPressed);
    }
  }, [externalPressed]);

  const handleToggle = () => {
    const newPressed = isPressed === undefined ? true : !isPressed;
    setInternalPressed(newPressed);
    onPressedChange && onPressedChange(newPressed);
  };

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
    height: '1.5rem',
    width: '3rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: thumbColor,
  };

  return (
    <TogglePrimitive.Root
      ref={ref}
      pressed={isPressed}
      onPressedChange={handleToggle}
      className={className}
      style={style}
      disabled={disabled}
    />
  );
});
