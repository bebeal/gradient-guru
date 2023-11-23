'use client'

import { createContext, useContext } from 'react';

export interface ThemePanelContextValue {
  themePanelEnabled: boolean;
  setThemePanelEnabled: (show: boolean) => void;
}

export const ThemePanelContext = createContext<ThemePanelContextValue>({
  themePanelEnabled: false,
  setThemePanelEnabled: () => {},
});

export const useThemePanel = () => useContext(ThemePanelContext);
