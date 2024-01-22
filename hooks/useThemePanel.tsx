'use client'

import { createContext, useContext } from 'react';

const themes = ['dark', 'light'] as const;
export type Theme = typeof themes[number];

export interface ThemePanelContextValue {
  themePanelEnabled: boolean;
  setThemePanelEnabled: (show: boolean) => void;
}

export const ThemePanelContext = createContext<ThemePanelContextValue>({
  themePanelEnabled: false,
  setThemePanelEnabled: () => {},
});

export const useThemePanel = () => useContext(ThemePanelContext);
