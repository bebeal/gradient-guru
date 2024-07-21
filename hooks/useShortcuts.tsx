'use client';

import { Options, useHotkeys } from 'react-hotkeys-hook';
import { META_MAC } from '@/utils/keymap';
import { useDevTools } from './useDevTools';
import { useToasts } from './useToasts';

export interface Shortcut {
  key: string;
  action: () => void;
  options?: {
    description?: string;
    scopes?: string | string[];
  };
}

export interface GroupedShortcuts {
  global: Shortcut[];
  groups: Record<string, Shortcut[]>;
}

// Group shortcuts into global and scoped groups
export const groupShortcuts = (shortcuts: Shortcut[]): GroupedShortcuts => {
  const global = shortcuts.filter((s) => s.options?.scopes?.includes('*') || !s.options?.scopes);
  const inGroups = shortcuts.filter((s) => !global.includes(s));

  const groups = inGroups.reduce(
    (acc, shortcut) => {
      const scopes = typeof shortcut?.options?.scopes === 'string' ? [shortcut.options.scopes] : shortcut.options?.scopes || [];
      scopes.forEach((scope) => {
        if (!acc[scope]) {
          acc[scope] = [];
        }
        acc[scope].push(shortcut);
      });
      return acc;
    },
    {} as Record<string, Shortcut[]>,
  );

  return { global, groups };
};

export const useShortcuts = () => {
  const { addToast } = useToasts();
  const { debug, setDebug } = useDevTools();

  useHotkeys(
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
