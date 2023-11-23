"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Toast from "@radix-ui/react-toast";
import { DirectionProvider } from '@radix-ui/react-direction';
import { ThemePanelContext } from "@/hooks";
import StyledComponentsRegistry from "./registry";

import '@/assets/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/assets/fonts/Monaspace/Monaspace.css';
import '@radix-ui/themes/styles.css';
import '@/app/globals.css';

const queryClient = new QueryClient();

const Providers = ({ children }: any) => {
  const [themePanelEnabled, setThemePanelEnabled] = useState<boolean>(false);

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
              <QueryClientProvider client={queryClient}>
                <Toast.Provider>
                  <div className="flex flex-col h-screen w-full overflow-hidden">
                    {children}
                  </div>
                  {themePanelEnabled && <ThemePanel />}
                </Toast.Provider>
              </QueryClientProvider>
            </DirectionProvider>
          </ThemePanelContext.Provider>
        </StyledComponentsRegistry>
      </Theme>
    </ThemeProvider>
  );
};

export default Providers;
