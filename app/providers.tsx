'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { DocConfig } from '@/app/config';
import { DevToolsProvider, ThemeProvider, useDynamicDocTitle } from '@/hooks';
import { makeQueryClient, StyledComponentsRegistry } from '@/utils';
// import global styles
import '@/app/globals.css';
import '@/assets/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/assets/fonts/Monaspace/Monaspace.css';

// Global level providers
const Providers = ({ children }: any) => {
  const queryClient = makeQueryClient();
  useDynamicDocTitle(DocConfig);

  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <DevToolsProvider>{children}</DevToolsProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
