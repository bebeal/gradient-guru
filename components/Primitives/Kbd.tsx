'use client';

import React, { forwardRef, useState } from 'react';
import { cn, KeyMap } from '@/utils';

const mapChildren = (children: string | string[] | React.ReactNode): string | string[] | React.ReactNode => {
  if (typeof children === 'string') {
    return children.split('').map((key) => KeyMap[key] || key);
  }
  
  if (Array.isArray(children)) {
    return children.map((child) => {
      if (typeof child === 'string') {
        return KeyMap[child] || child;
      }
      return child;
    });
  }
  
  // If it's not a string or array, return as is (could be a single React element or other value)
  return children;
};

export interface KbdProps {
  children?: any;
  className?: string;
  plusSign?: boolean;
  popup?: boolean;
}

export const Kbd = forwardRef((props: KbdProps, ref?: any) => {
  const { children, className = '', plusSign = false, popup = false } = props;
  const [clicked, setClicked] = useState<boolean>(false);
  // children can be a string, array, or single key
  const mappedKeys = mapChildren(children);

  const formatKeys = () => {
    if (!Array.isArray(mappedKeys)) {
      return <span>{mappedKeys}</span>;
    }
  
    return mappedKeys.map((key, index) => (
      <React.Fragment key={`key-${index}`}>
        <span>{key}</span>
        {plusSign && index < mappedKeys.length - 1 && mappedKeys[index + 1] !== ' ' && <span>+</span>}
      </React.Fragment>
    ));
  };

  const handleCopy = (e: React.ClipboardEvent) => {
    const selection = window.getSelection();
    if (selection) {
      const text = selection.toString().replace(/\s\+\s/g, '');
      e.clipboardData.setData('text/plain', text);
      e.preventDefault();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (mappedKeys && Array.isArray(mappedKeys)) {
      navigator.clipboard.writeText(mappedKeys.join('').replace(/\s\+\s/g, ''));
    } else if (mappedKeys) {
      navigator.clipboard.writeText(mappedKeys.toString());
    }
    if (popup) {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    }
  };

  return (
    <kbd
      ref={ref}
      className={cn(
        `relative flex gap-1 h-auto w-auto items-center justify-center text-center rounded px-2 opacity-100`,
        `shadow-kbd bg-zinc-900 text-kbd-foreground border-kbd-foreground font-mono font-bold`,
        `hover:bg-zinc-950 cursor-pointer hover:text-primary hover:shadow-kbd-hover`,
        className,
      )}
      onClick={handleClick}
      onCopy={handleCopy}
    >
      {formatKeys()}
      {clicked && <span className="absolute top-0 -mt-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2">Copied</span>}
    </kbd>
  );
});
Kbd.displayName = 'Kbd';
