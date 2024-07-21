'use client';

import { forwardRef, Fragment, memo, ReactNode, useCallback, useMemo, useState } from 'react';
import { useMounted } from '@/hooks';
import { cn, KeyMap } from '@/utils';
import { Loading } from './Loading';

const mapString = (key: string): string => {
  // key could be just a single character
  if (key.length === 1) {
    return KeyMap?.[key] || key;
  }
  // or a special key in which case we'll format it KeyMap['Meta']-> '⌘' (if it exists)
  const capitalized = key.slice(0, 1).toUpperCase() + key.slice(1);
  return KeyMap?.[capitalized] || capitalized;
};

// format key codes passed aa a string or an array of strings
const mapStrings = (keys: string[] | string): string[] | string => {
  if (Array.isArray(keys)) {
    return keys.map(mapString);
  }
  return mapString(keys);
};

// Map key codes passed as a string, an array of strings, or react components
const mapChildren = (children: string | string[] | ReactNode): string | string[] | ReactNode => {
  if (typeof children === 'string' || (Array.isArray(children) && typeof children?.[0] === 'string')) {
    return mapStrings(children);
  }
  // don't do anything if they're react components
  return children;
};

export interface KbdProps {
  children?: any;
  className?: string;
  clickToCopy?: boolean;
}

export const KbdKey = memo(
  forwardRef((props: any, ref?: any) => {
    const { children, className = '', ...rest } = props;

    return (
      <kbd
        ref={ref}
        className={cn(
          `relative flex gap-1 h-auto w-auto items-center justify-center text-center rounded px-1.5`,
          `shadow-kbd bg-zinc-900 text-kbd-foreground border-kbd-foreground font-mono font-bold`,
          `hover:bg-zinc-950 cursor-pointer hover:text-primary hover:shadow-kbd-hover`,
          className,
        )}
        {...rest}
      >
        {children}
      </kbd>
    );
  }),
);
KbdKey.displayName = 'KbdKey';

export const Kbd = forwardRef((props: KbdProps, ref?: any) => {
  const { children, className = '', clickToCopy = false } = props;
  const mounted = useMounted();
  const [clicked, setClicked] = useState<boolean>(false);
  // children can be a string, array, or react components. Map valid key codes
  const mappedKeys = useMemo(() => mapChildren(children), [children]);

  const getTextToCopy = (keys?: string | string[] | ReactNode): string => {
    return (Array.isArray(keys) ? keys.join('') : keys)?.toString() || '';
  };

  const handleCopySelection = (e?: React.ClipboardEvent) => {
    const selection = window.getSelection()?.toString();
    if (selection) {
      const text = getTextToCopy(selection);
      e?.clipboardData.setData('text/plain', text);
      e?.preventDefault();
    }
  };

  const handleClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (clickToCopy) {
      setClicked(true);
      navigator.clipboard.writeText(getTextToCopy(mappedKeys));
      setTimeout(() => setClicked(false), 300);
    }
  };

  return (
    <KbdKey
      ref={ref}
      className={cn(
        !clickToCopy && 'pointer-events-none', // prevent even going into the handleClick function if clickToCopy is false
        clickToCopy && 'relative overflow-visible',
        className,
      )}
      onClick={handleClick}
      onCopy={handleCopySelection}
    >
      {/* Show loader to prevent: `Text content did not match. Server: "⊞" Client: "⌘"` */}
      {/* Make loading like ~1ch width to try and prevent layout shift but it's not perfect will fix later */}
      {/* {mounted ? mappedKeys : <Loading className="w-[1ch] leading-none" />} */}
      {mappedKeys}
      {clicked && <span className="absolute top-0 -mt-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 z-[var(--layer-overlays)]">Copied</span>}
    </KbdKey>
  );
});
Kbd.displayName = 'Kbd';
