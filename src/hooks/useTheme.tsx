import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from 'react';
import { Theme as RadixTheme, ThemePanel as RadixThemePanel, ThemeProps } from '@radix-ui/themes';

import '@radix-ui/themes/styles.css';

const SHOW_BY_DEFAULT = false;

export const getThemeAppearance = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export interface ThemeContextType {
  theme: ThemeProps;
  showThemePanel: boolean;
  setShowThemePanel: (show: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children }) => {
  const [showThemePanel, setShowThemePanel] = useState<boolean>(SHOW_BY_DEFAULT);
  const theme: ThemeProps = {
    appearance: 'dark',
    accentColor: 'indigo',
    grayColor: 'auto',
    panelBackground: 'translucent',
    radius: 'medium',
    scaling: '100%',
  };

  const contextValue: ThemeContextType = {
    theme,
    showThemePanel,
    setShowThemePanel,
  };

  return (
    <RadixTheme asChild={false} hasBackground {...theme}>
      <ThemeContext.Provider value={contextValue}>
        {children}
        {showThemePanel && <RadixThemePanel />}
      </ThemeContext.Provider>
    </RadixTheme>
  );
};

// Any component in this app can use this hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
