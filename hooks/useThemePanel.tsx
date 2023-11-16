'use client'

import { createContext, useContext } from 'react';

export interface ThemePanelContextProps {
  themePanelEnabled: boolean;
  setThemePanelEnabled: (show: boolean) => void;
}

export const ThemePanelContext = createContext<ThemePanelContextProps>({
  themePanelEnabled: false,
  setThemePanelEnabled: () => {},
});

export const useThemePanel = () => useContext(ThemePanelContext);
