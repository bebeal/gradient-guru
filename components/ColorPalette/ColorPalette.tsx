'use client';

import { useCallback, useEffect, useState } from 'react';

export interface ColorPaletteProps {
  name: string;
  value: string;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ name, value }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isCopied) {
      timeoutId = setTimeout(() => setIsCopied(false), 1500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isCopied]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
  }, [value]);

  return (
    <div className="relative flex">
      <div className="flex items-center gap-x-3 w-full cursor-pointer sm:block sm:space-y-1.5" onClick={handleCopy}>
        <div className="h-10 w-10 rounded dark:ring-1 dark:ring-inset dark:ring-white/10" style={{ backgroundColor: value }} />
        <div className="flex flex-col px-0.5 max-w-20">
          <div className="min-w-6 w-auto font-medium text-xs text-slate-900 dark:text-white">{name}</div>
          <div className="text-slate-500 text-xs font-mono lowercase dark:text-slate-400 sm:text-[0.625rem] md:text-xs lg:text-[0.625rem] 2xl:text-xs break-words">{value}</div>
        </div>
      </div>
      {isCopied && (
        <div className="absolute bottom-full left-1/2 mb-3.5 pb-1 -translate-x-1/2 bg-sky-500 text-white font-mono text-[0.625rem] leading-6 font-medium px-1.5 rounded-lg">
          Copied
          <svg aria-hidden="true" width="16" height="6" viewBox="0 0 16 6" className="text-sky-500 absolute top-full left-1/2 -mt-px -ml-2">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
