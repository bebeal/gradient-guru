import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Kbd } from '../components/Primitives/Kbd';

export type KeyLoggerConfig = {
  combineTime: number; // Determines the clock speed for combining keys i.e. if consecutive keys are pressed within this time, they are combined into a single toast
  fadeTime: number; // Determines the time it takes for a toast to fade out naturally
  maxToasts: number; // Maximum number of toasts that can be displayed at a time
  maxKeyLength: number; // Maximum number of keys that can be combined into a single toast
  clickToDismiss?: boolean; // If true, toasts can be dismissed by clicking on them
  clickToCopy?: boolean; // If true, toasts can be copied by clicking on them
};

export const useKeyLogger = (initialConfig: Partial<KeyLoggerConfig> = {}) => {
  const [config, setConfig] = useState<KeyLoggerConfig>({
    combineTime: 250,
    fadeTime: 2000,
    maxToasts: 1,
    maxKeyLength: 20,
    clickToDismiss: false,
    clickToCopy: true,
    ...initialConfig,
  });
  const [keys, setKeys] = useState<any>([]);

  // Combine keys if they are pressed within a certain time and add to existing toast
  // otherwise, start a new toast
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const now = Date.now();
      if (keys.length === 0 || now - keys?.[keys.length - 1]?.timestamp > config?.combineTime || keys?.[keys.length - 1]?.keys.length >= config?.maxKeyLength) {
        // start a new toast if past combineTime or length of current toast exceeds maxKeyLength
        setKeys((prevKeys: any) => [...prevKeys, { keys: [e.key], timestamp: now }]);
      } else {
        // add to existing toast
        const prevKeys = [...keys];
        const prevKey = prevKeys?.[prevKeys.length - 1];
        prevKey?.keys.push(e.key);
        prevKey.timestamp = now;
        setKeys(prevKeys);
      }
    },
    [keys, config?.combineTime, config?.maxKeyLength],
  );

  const fadeKey = () => setKeys((prevKeys: any) => prevKeys.slice(1));

  useEffect(() => {
    if (keys.length === 0) return;

    let fadeTimer: any = null;
    // fade out toasts when maxTokens reached
    if (keys?.length > config?.maxToasts) {
      fadeKey();
    } else {
      // Fade out toasts based on fadeTime
      fadeTimer = setInterval(() => {
        fadeKey();
      }, config.fadeTime);
    }

    return () => {
      if (fadeTimer !== null) {
        clearInterval(fadeTimer);
      }
    };
  }, [keys, config.combineTime, config.fadeTime, config.maxToasts]);

  // listen for keydown events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // remove toast when clicked
  const removeToast = useCallback((index: number) => {
    setKeys((prevKeys: any) => prevKeys.filter((_: any, i: number) => i !== index));
  }, []);

  // generic stream function to get the keys
  const streamKeys = () => {
    return keys.map((key: any) => key.keys).join(' ');
  };

  const onClick = useCallback(
    (e: React.MouseEvent, index: number) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (config.clickToDismiss) {
        removeToast(index);
      }
    },
    [config.clickToDismiss],
  );

  // render this to get the toasts
  const streamToasts = () => {
    return (
      <div className="flex flex-col w-auto h-auto py-10 gap-[10px] m-[5px] overflow-visible z-[var(--layer-overlays)]">
        {keys.map((key: any, index: number) => (
          <div key={`key-${index}-${nanoid()}`} onClick={(e) => onClick(e, index)} className="w-auto h-auto flex">
            <Kbd clickToCopy={config.clickToCopy}>{key.keys}</Kbd>
          </div>
        ))}
      </div>
    );
  };

  return { streamKeys, streamToasts, keys, setKeys, config, setConfig };
};
