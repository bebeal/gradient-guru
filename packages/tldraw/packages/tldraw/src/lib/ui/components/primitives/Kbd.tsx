import { kbd } from './shared'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
};



/** @internal */
export interface KbdProps {
	children: string;
  className?: string;
  plusSign?: boolean;
}

/** @internal */
export function Kbd(props: KbdProps) {
  const { children, className = '', plusSign = false } = props;
  const mappedKeys = kbd(children)

  const formatKeys = () => {
    const elements = [];

    for (let i = 0; i < mappedKeys.length; i++) {
      elements.push(<span key={i} className={cn(mappedKeys[i] === '⇧' && 'transform translate-y-[-1px] h-full')}>{mappedKeys[i]}</span>);
      if (plusSign && i < mappedKeys.length - 1 && mappedKeys[i + 1] !== ' ') {
        elements.push( '+' );
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

  return (
    <kbd
      className={cn(
        `flex gap-1 h-auto w-auto items-center justify-center rounded px-1.5 text-[10px] opacity-100`,
        `shadow-kbd bg-zinc-900 text-kbd-foreground border-kbd-foreground font-mono font-bold`,
        `hover:bg-zinc-950 cursor-pointer hover:text-primary hover:shadow-kbd-hover`,
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (mappedKeys) {
          navigator.clipboard.writeText(mappedKeys.join('').replace(/\s\+\s/g, ''));
        }
        
        
      }}
      onCopy={handleCopy}
    >{formatKeys()}</kbd>
  );
}
