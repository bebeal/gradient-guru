
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTheme = create(persist((set) => ({
  theme: 'system',
  setTheme: (theme: string) => set({ theme }),
}), {
  name: 'theme-storage',
}));
