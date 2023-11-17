"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Toast from "@radix-ui/react-toast";
import { DirectionProvider } from '@radix-ui/react-direction';
import { ThemePanelContext } from "@/hooks";
import '@/app/globals.css';
import '@/assets/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/assets/fonts/Monaspace/Monaspace.css';
import '@radix-ui/themes/styles.css';

const queryClient = new QueryClient();

const Providers = ({ children }: any) => {
  const [themePanelEnabled, setThemePanelEnabled] = useState<boolean>(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Theme
        asChild={false}
        hasBackground={true}
        appearance="inherit"
        accentColor="indigo"
        grayColor="auto"
        panelBackground="translucent"
        radius="medium"
        scaling="100%"
      >
        <ThemePanelContext.Provider value={{ themePanelEnabled, setThemePanelEnabled }}>
          <DirectionProvider dir="rtl">
            <QueryClientProvider client={queryClient}>
              <Toast.Provider>
                {children}
                {themePanelEnabled && <ThemePanel />}
              </Toast.Provider>
            </QueryClientProvider>
          </DirectionProvider>
        </ThemePanelContext.Provider>
      </Theme>
    </ThemeProvider>
  );
};

export default Providers;
