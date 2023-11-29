import * as TogglePrimitive from '@radix-ui/react-toggle';
import { forwardRef, useState, useEffect } from 'react';

interface ExtendedCSSProperties extends React.CSSProperties {
  '--handleoffset'?: string;
  '--animation-input'?: string;
  '--togglehandleborder'?: string;
  '--tglbg'?: string;
}

export interface SwitchProps extends TogglePrimitive.ToggleProps {
  handleOffset?: string;
  baseColor?: string;
  animationInput?: string;
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
    animationInput = '0.2s',
    className,
    baseColor = 'currentColor',
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

  const commonStyle: ExtendedCSSProperties = {
    '--animation-input': animationInput,
    '--handleoffset': handleOffset,
    '--togglehandleborder': '0 0',
    '--tglbg': baseColor,
    transition: 'background, box-shadow var(--animation-input, 0.2s) ease-out',
    boxShadow: isPressed === undefined 
                ? 'calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset, calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset' 
                : isPressed ? 'var(--handleoffset) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset' 
                            : `calc(var(--handleoffset) * -1) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset`,
    appearance: 'none',
    border: '1px solid',
    borderRadius: '1.9rem',
    height: '1.5rem',
    width: '3rem',
    opacity: disabled ? 0.3 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <TogglePrimitive.Root
      ref={ref}
      pressed={isPressed}
      onPressedChange={handleToggle}
      className={className}
      style={commonStyle}
      disabled={disabled}
    />
  );
});
