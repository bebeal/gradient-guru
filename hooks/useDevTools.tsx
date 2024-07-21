import { useEffect } from 'react';
import { z } from 'zod';
import { create } from 'zustand';
import { KeyLoggerConfig } from './useKeyLogger';

export interface DevToolsStore {
  debug: number | boolean;
  setDebug: (value: number | boolean) => void;
  toggleDebug: () => void;
  keyLoggerConfig: KeyLoggerConfig;
  setKeyLoggerConfig: (value: KeyLoggerConfig) => void;
}

export const DevToolsSchema = z.object({
  debug: z.boolean(),
  keyLoggerConfig: z.object({
    combineTime: z.number().int().nonnegative(),
    fadeTime: z.number().int().nonnegative(),
    maxToasts: z.number().int().positive(),
    maxKeyLength: z.number().int().positive(),
    clickToDismiss: z.boolean(),
    clickToCopy: z.boolean(),
  }),
});
export type DevToolsForm = z.infer<typeof DevToolsSchema>;

export const useDevToolsStore = create<DevToolsStore>((set) => ({
  debug: false,
  setDebug: (value) => set({ debug: value }),
  toggleDebug: () => set((state) => ({ debug: !state.debug })),
  keyLoggerConfig: {
    combineTime: 250,
    fadeTime: 2000,
    maxToasts: 1,
    maxKeyLength: 20,
    clickToDismiss: false,
    clickToCopy: true,
  },
  setKeyLoggerConfig: (value) => set({ keyLoggerConfig: value }),
}));

export const useDevTools = () => useDevToolsStore((state) => state);
