import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { DevToolsProvider } from '@/hooks/useDevTools';
import { ThemeProvider } from '@/hooks/useTheme';
import { ToastsProvider } from '@/hooks/useToasts';
import { Router } from '@/routes';
import { makeQueryClient } from '@/utils/react-query';

import './globals.css';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = makeQueryClient();
  // useDynamicDocTitle(DocConfig);
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DevToolsProvider>
          <ToastsProvider>
            <main className="relative h-screen w-screen overflow-auto bg-primary text-primary">{children}</main>
          </ToastsProvider>
        </DevToolsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export const App = () => {
  return (
    <Providers>
      <Router />
    </Providers>
  );
};
