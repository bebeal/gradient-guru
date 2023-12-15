"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import * as Toast from "@radix-ui/react-toast";
import { DirectionProvider } from '@radix-ui/react-direction';
import { DebugPanelContext, ModelClientProvider, ThemePanelContext } from "@/hooks";
import StyledComponentsRegistry from "./registry";

import '@/assets/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/assets/fonts/Monaspace/Monaspace.css';
import '@radix-ui/themes/styles.css';
import '@/app/globals.css';
import { cn, isDevEnv } from "@/utils";

const queryClient = new QueryClient();

const Providers = ({ children }: any) => {
  const [themePanelEnabled, setThemePanelEnabled] = useState<boolean>(false);
  const [debugMode, setDebug] = useState<number>(isDevEnv ? 1 : 0);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Theme
        asChild={false}
        hasBackground={true}
        appearance="dark"
        accentColor="indigo"
        grayColor="auto"
        panelBackground="translucent"
        radius="medium"
        scaling="100%"
      >
        <StyledComponentsRegistry>
          <ThemePanelContext.Provider value={{ themePanelEnabled, setThemePanelEnabled }}>
            <DirectionProvider dir="ltr">
              <DebugPanelContext.Provider value={{ debugMode, setDebug }}>
                <QueryClientProvider client={queryClient}>
                  <Toast.Provider>
                    <ModelClientProvider>
                      <div className="flex flex-col h-screen w-full overflow-hidden">
                        {children}
                        {debugMode === 1 && <div className="absolute z-[99999] bg-primary"><ReactQueryDevtools closeButtonProps={{className: cn(`hidden`)}} initialIsOpen={true} position="top-left" /></div>}
                      </div>
                      {themePanelEnabled && <ThemePanel />}
                    </ModelClientProvider>
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
