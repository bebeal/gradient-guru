import { forwardRef, InputHTMLAttributes, useCallback, useEffect, useState } from 'react';

import { Radius, RadiusClasses } from '@/utils/styles';
import { cn, noop } from '@/utils/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  radius?: Radius;
  extraCharWidth?: number;
  placeholder?: string;
}

export const Input = forwardRef((props: InputProps, ref: any) => {
  const { id, type = 'text', radius = 'medium', className = '', placeholder = '', extraCharWidth = 1, value = '', onChange: onChangeCallback = noop } = props;
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const onChange = useCallback(
    (e: any) => {
      setInternalValue(e.target.value);
      onChangeCallback?.(e);
    },
    [onChangeCallback],
  );

  const getNumChars = useCallback(() => {
    const length = internalValue ? internalValue.toString().length : placeholder?.toString()?.length;
    return Math.min(Math.max(length, 2), 20);
  }, [internalValue, placeholder]);

  return (
    <input
      autoComplete="off"
      id={id}
      name={id}
      type={type}
      ref={ref}
      placeholder={placeholder}
      value={internalValue}
      onChange={onChange}
      size={getNumChars() + extraCharWidth}
      className={cn(
        `flex w-full flex-shrink h-auto items-center flex-wrap border p-px shadow-sm text-center`,
        `focus:outline-none [&>span]:line-clamp-1`,
        'bg-secondary text-secondary ring-inset border-secondary ring-1 ring-primary outline-none',
        'hover:bg-secondary hover:text-primary hover:ring-accent/50',
        'focus:bg-secondary focus:text-primary focus:ring-accent focus:caret-accent',
        'focus-within:bg-secondary focus-within:text-primary focus-within:ring-accent focus-within:caret-accent focus-within:placeholder:text-transparent',
        RadiusClasses(radius),
        className,
      )}
    />
  );
});
Input.displayName = 'Input';
