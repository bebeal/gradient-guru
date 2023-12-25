'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'
import { Radius, RadiusClasses, cn } from '@/utils';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  children?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?:  any;
  radius?: Radius;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props: TextAreaProps, ref: React.ForwardedRef<any>) => {
  const { className, children, value, onChange, placeholder="Add prompt...", radius='medium', ...rest } = props;

    return (
      <textarea
        ref={ref}
        tabIndex={0}
        rows={1}
        spellCheck={false}
        autoComplete='off'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          `flex w-full flex-shrink h-auto items-center flex-wrap border px-1.5 py-0.5 shadow-sm text-center`,
          `focus:outline-none [&>span]:line-clamp-1`,
          'bg-secondary text-secondary ring-inset border-secondary ring-1 ring-primary outline-none',
          'hover:bg-secondary hover:text-primary hover:ring-accent/50',
          'focus:bg-secondary focus:text-primary focus:ring-accent focus:caret-accent',
          'focus-within:bg-secondary focus-within:text-primary focus-within:ring-accent focus-within:caret-accent',
          '[form-sizing:auto]',
          RadiusClasses(radius),
          className,
        )}
        {...rest}
        />
    );
});
TextArea.displayName = 'TextArea';
