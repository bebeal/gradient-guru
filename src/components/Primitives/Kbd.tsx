;

import { KeyMap } from '@/utils/keymap';
import { cn } from '@/utils/utils';
import React, { forwardRef } from 'react';

export interface KbdProps {
  children?: any;
  className?: string;
  plusSign?: boolean;
  popup?: boolean;
}

export const Kbd = forwardRef((props: KbdProps, ref?: any) => {
  const { children, className = '', plusSign = false, popup = false } = props;
  const [clicked, setClicked] = React.useState(false);
  const mappedKeys = children.split('').map((key: any) => KeyMap[key] || key);

  const formatKeys = () => {
    const elements = [];

    for (let i = 0; i < mappedKeys.length; i++) {
      // I hate that this key is horiztonally offset, so this is to line it up with the other keys
      elements.push(
        <span key={i} className={cn(mappedKeys[i] === '⇧' && 'transform translate-y-[-1px] h-full')}>
          {mappedKeys[i]}
        </span>,
      );
      if (plusSign && i < mappedKeys.length - 1 && mappedKeys[i + 1] !== ' ') {
        elements.push('+');
      }
    }

    return elements;
  };

  const handleCopy = (e: React.ClipboardEvent) => {
    const selection = window.getSelection();
    if (selection) {
      let text = selection.toString();
      text = text.replace(/\s\+\s/g, '');
      e.clipboardData.setData('text/plain', text);
      e.preventDefault();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (mappedKeys) {
      navigator.clipboard.writeText(mappedKeys.join('').replace(/\s\+\s/g, ''));
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
        `relative flex gap-1 h-auto w-auto items-center justify-center rounded px-1.5 text-[10px] opacity-100`,
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
