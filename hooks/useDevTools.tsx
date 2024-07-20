import { create } from "zustand";

export interface DevToolsStore {
  debug: number | boolean;
  setDebug: (value: number | boolean) => void;
}

export const useDevToolsStore = create<DevToolsStore>((set) => ({
  debug: false,
  setDebug: (value) => set({ debug: value }),
}));

export const useDevTools = () => useDevToolsStore((state) => state);
