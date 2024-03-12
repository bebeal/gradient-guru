'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { DocTitleConfig } from '@/app/doc-config';
import { ThemeProvider, useDynamicDocTitle } from '@/hooks';
import { makeQueryClient, StyledComponentsRegistry } from '@/utils';
// import global styles
import '@/assets/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/assets/fonts/Monaspace/Monaspace.css';
import '@/app/globals.css';

// Global level providers
const Providers = ({ children }: any) => {
  const queryClient = makeQueryClient();
  useDynamicDocTitle(DocTitleConfig);

  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
