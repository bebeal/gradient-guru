import { useEffect } from "react";
import { create } from "zustand";

export interface DevToolsStore {
  debug: number | boolean;
  setDebug: (value: number | boolean) => void;
  toggleDebug: () => void;
}

export const useDevToolsStore = create<DevToolsStore>((set) => ({
  debug: false,
  setDebug: (value) => set({ debug: value }),
  toggleDebug: () => set((state) => ({ debug: !state.debug })),
}));

export const useDevTools = () => useDevToolsStore((state) => state);
