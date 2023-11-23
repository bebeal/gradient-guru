'use client'

import React, { ChangeEvent, ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import { Radius, RadiusClasses, cn, noop } from '@/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  radius?: Radius;
};

export const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const {
    type='text',
    radius='medium',
    className='',
    onChange=noop,
    ...rest
  } = props;

  return (
    <input
      autoComplete='off'
      type={type}
      ref={ref}
      onChange={onChange}
      className={cn(
        `flex w-auto h-auto items-center justify-between whitespace-nowrap border border-secondary bg-secondary px-2 py-1 text-sm shadow-sm`,
        `focus:outline-none [&>span]:line-clamp-1`,
        RadiusClasses(radius),
        className,
        'bg-primary text-secondary ring-1 ring-primary outline-none',
        'hover:bg-primary hover:text-primary hover:ring-accent/50',
        'focus:bg-primary focus:text-primary focus:ring-accent focus:caret-accent focus-within:bg-primary focus-within:text-primary focus-within:ring-accent focus-within:caret-accent',
        className
      )}
      {...rest}

    />
  )
});
Input.displayName = 'Input';
