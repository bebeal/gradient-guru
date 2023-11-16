"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Toast from "@radix-ui/react-toast";
import { ThemePanelContext } from "@/hooks";
import '@/app/globals.css';
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
          <QueryClientProvider client={queryClient}>
            <Toast.Provider>
              {children}
              {themePanelEnabled && <ThemePanel />}
            </Toast.Provider>
          </QueryClientProvider>
        </ThemePanelContext.Provider>
      </Theme>
    </ThemeProvider>
  );
};

export default Providers;
