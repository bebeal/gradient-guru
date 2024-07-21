'use client';

import { useHotkeys as useHotkeysHook } from 'react-hotkeys-hook';
import { useDevTools } from './useDevTools';
import { useToasts } from './useToasts';

export interface Hotkey {
  key: string;
  action: () => void;
  options?: {
    description?: string;
    scopes?: string | string[];
  };
}

export interface GroupedHotkeys {
  global: Hotkey[];
  groups: Record<string, Hotkey[]>;
}

// Group hotkeys into global and scoped groups
export const groupHotkeys = (hotkeys: Hotkey[]): GroupedHotkeys => {
  const global = hotkeys.filter((s) => s.options?.scopes?.includes('*') || !s.options?.scopes);
  const inGroups = hotkeys.filter((s) => !global.includes(s));

  const groups = inGroups.reduce(
    (acc, hotkey) => {
      const scopes = typeof hotkey?.options?.scopes === 'string' ? [hotkey.options.scopes] : hotkey.options?.scopes || [];
      scopes.forEach((scope) => {
        if (!acc[scope]) {
          acc[scope] = [];
        }
        acc[scope].push(hotkey);
      });
      return acc;
    },
    {} as Record<string, Hotkey[]>,
  );

  return { global, groups };
};

export const useHotkeys = () => {
  const { addToast } = useToasts();
  const { debug, setDebug } = useDevTools();

  useHotkeysHook(
    `ctrl+d`,
    () => {
      addToast({
        title: 'Debug mode toggled',
        description: !debug ? 'Enabled' : 'Disabled',
      });
      setDebug(!debug);
    },
    undefined,
    [debug, setDebug],
  );
};
