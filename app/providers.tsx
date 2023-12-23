'use client';

import { useState } from 'react';
import { DirectionProvider } from '@radix-ui/react-direction';
import * as Toast from '@radix-ui/react-toast';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { DebugPanelContext, ThemePanelContext } from '@/hooks';
import { cn, isDevEnv } from '@/utils';
import StyledComponentsRegistry from './registry';
import '@/assets/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/assets/fonts/Monaspace/Monaspace.css';
import '@radix-ui/themes/styles.css';
import '@/app/globals.css';


const makeQueryClient = (overrideOptions?: any) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000,
      },
    },
    ...overrideOptions,
  });
};

const Providers = ({ children }: any) => {
  const [queryClient] = useState(makeQueryClient());

  const [themePanelEnabled, setThemePanelEnabled] = useState<boolean>(false);
  const [debugMode, setDebug] = useState<number>(isDevEnv ? 1 : 0);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Theme asChild={false} hasBackground={true} appearance="dark" accentColor="indigo" grayColor="auto" panelBackground="translucent" radius="medium" scaling="100%">
        <StyledComponentsRegistry>
          <ThemePanelContext.Provider value={{ themePanelEnabled, setThemePanelEnabled }}>
            <DirectionProvider dir="ltr">
              <DebugPanelContext.Provider value={{ debugMode, setDebug }}>
                <QueryClientProvider client={queryClient}>
                  <Toast.Provider>
                    <div className="flex flex-col h-screen w-full overflow-hidden">
                      {children}
                      {debugMode === 1 && (
                        <div className="absolute z-[99999] bg-primary">
                          <ReactQueryDevtools
                            
                            initialIsOpen={false}
                            position="top"
                            buttonPosition="bottom-left"
                          />
                        </div>
                      )}
                    </div>
                    {themePanelEnabled && <ThemePanel />}
                  </Toast.Provider>
                </QueryClientProvider>
              </DebugPanelContext.Provider>
            </DirectionProvider>
          </ThemePanelContext.Provider>
        </StyledComponentsRegistry>
      </Theme>
    </ThemeProvider>
  );
};

export default Providers;