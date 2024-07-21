'use client';

import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from 'react';
import { Theme as RadixTheme, ThemeOptions as RadixThemeOptions, ThemePanel as RadixThemePanel } from '@radix-ui/themes';
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes';
import { ThemeProviderProps as NextThemeProviderProps, UseThemeProps as UseNextThemeProps } from 'next-themes/dist/types';
import '@radix-ui/themes/styles.css';

// * Centralizing themeing libraries to be controllable from a single context provider without having hard requirements on consumers to choose one, any, or none.
//   * The `next-themes` library is used to handle the theme switching and system preference.
//   * The `@radix-ui/themes` library is used to handle the themeing of the radix themed components.

export interface ThemeContextType {
  theme: UseNextThemeProps & RadixThemeOptions;
  nextTheme: UseNextThemeProps;
  radixTheme: RadixThemeOptions;
  showThemePanel: boolean;
  setShowThemePanel: (show: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children }) => {
  const [showThemePanel, setShowThemePanel] = useState<boolean>(false); //  use build flag in future
  const nextTheme = useNextTheme();
  const radixTheme: any = {
    // * Both theme libraries have similar but slightly diff naming conventions:
    //   * `next-themes` allows themes to be `dark` | `light` | `system`, but defines `systemTheme` as just `dark` | `light`
    //   * `@radix-ui/themes` allows `appearance` property to be `dark` | `light` | `inherit`
    appearance: nextTheme.systemTheme || `dark`,
    accentColor: 'indigo',
    grayColor: 'auto',
    panelBackground: 'translucent',
    radius: 'medium',
    scaling: '100%',
  };

  const contextValue: ThemeContextType = {
    theme: {
      ...nextTheme,
      ...radixTheme,
    },
    nextTheme,
    radixTheme,
    showThemePanel,
    setShowThemePanel,
  };

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <RadixTheme asChild={false} hasBackground {...radixTheme}>
        <ThemeContext.Provider value={contextValue}>
          {children}
          {showThemePanel && <RadixThemePanel />}
        </ThemeContext.Provider>
      </RadixTheme>
    </NextThemeProvider>
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
