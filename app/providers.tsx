'use client';

import { useCallback, useEffect, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DirectionProvider } from '@radix-ui/react-direction';
import { ToastProvider } from '@radix-ui/react-toast';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { DebugPanelContext, ThemePanelContext } from '@/hooks';
import { isDevEnv, NextAuthProvider, StyledComponentsRegistry } from '@/utils';

import '@/assets/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/assets/fonts/Monaspace/Monaspace.css';
import '@/app/globals.css';
import '@radix-ui/themes/styles.css';

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
  const [debugPanel, setDebugPanel] = useState<boolean>(false);

  // I don't wanna use the devtools standard button so this is a hack to get custom button to toggle the devtools
  const togglePanel = useCallback(() => {
    setDebugPanel((prev) => {
      const newValue = !prev;
      window.localStorage.setItem('TanstackQueryDevtools.open', String(newValue));
      return newValue;
    }); 
  }, []);

  useEffect(() => {
     // look for button with class tsqd-minimize-btn this is the close button for react-query-devtools
    const btn = document.querySelector(`.tsqd-minimize-btn`);
    if (btn) {
      btn.addEventListener('click', togglePanel);
      return () => {
        btn.removeEventListener('click', togglePanel);
      }
    }
  }, [togglePanel]);

  useEffect(() => {
    const pathSegments = window.location.pathname;
    console.log('pathSegments', pathSegments);
    const newTitle = pathSegments ? `GG • ${pathSegments}` : 'Gradient Guru';
    document.title = newTitle;
  }, []);

  return (
    <StyledComponentsRegistry>
      <DebugPanelContext.Provider value={{ debugMode, setDebug }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Theme asChild={false} hasBackground={true} appearance="dark" accentColor="indigo" grayColor="auto" panelBackground="translucent" radius="medium" scaling="100%">
              <ThemePanelContext.Provider value={{ themePanelEnabled, setThemePanelEnabled }}>
                <DirectionProvider dir="ltr">
                    <QueryClientProvider client={queryClient}>
                      <NextAuthProvider>
                        <ToastProvider>
                          <div className="flex flex-col h-screen w-full overflow-hidden">
                            {children}
                            {debugMode === 1 && (
                              <div className="absolute z-[99999] bg-primary h-full">
                                {/* <div className="absolute bottom-0 left-0 right-0 w-auto h-full">
                                  <Button variant="ghost" onClick={togglePanel}>Toggle</Button>
                                </div> */}
                                <ReactQueryDevtools
                                  key={debugPanel ? 'open' : 'closed'} // hack to force re-render on toggle
                                  initialIsOpen={false}
                                  position="top"
                                  buttonPosition="bottom-left"
                                />
                              </div>
                            )}
                          </div>
                          {themePanelEnabled && <ThemePanel />}
                        </ToastProvider>
                      </NextAuthProvider>
                    </QueryClientProvider>
                </DirectionProvider>
              </ThemePanelContext.Provider>
          </Theme>
        </ThemeProvider>
      </DebugPanelContext.Provider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
