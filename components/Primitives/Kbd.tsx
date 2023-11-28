'use client'

import React, { forwardRef, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { KeyMap, Loading, cn } from '@/utils';
import { useMounted } from '@/hooks';

export interface KbdProps {
  children?: any;
  className?: string;
  plusSign?: boolean;
};

export const Kbd = forwardRef((props: KbdProps, ref?: any) => {
  const {
    children,
    className='',
    plusSign=false,
  } = props;
  const mounted = useMounted();

  const formatKeys = (keys: string) => {
    const mappedKeys = keys.split(' ').map(k => KeyMap[k] || k).join(' ');
    const elements = [];
  
    for (let i = 0; i < mappedKeys.length; i++) {
      elements.push(mappedKeys[i]);
      if (plusSign && i < mappedKeys.length - 1 && mappedKeys[i + 1] !== ' ') {
        elements.push(<span key={nanoid()} className="font-normal mr-1 ml-1">+</span>);
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

  return (<kbd 
      ref={ref} 
      className={cn(
        `shadow-kbd rounded-md box-border inline-flex items-center justify-center flex-shrink-0 align-baseline text-center whitespace-nowrap relative top-[-0.05em] text-[0.75em]	leading-[1.7em] min-w-[1.75em] pl-[0.5em] pr-[0.5em] word-spacing`,
        `bg-zinc-900 text-gray-200 font-bold`,
        className,
        )}
        onCopy={handleCopy}
    >
      {mounted ? formatKeys(children) : <Loading />}
    </kbd>
  );
});
Kbd.displayName = 'Kbd';
