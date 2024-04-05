'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { DocConfig } from '@/app/config';
import { DevToolsProvider, ThemeProvider, useDynamicDocTitle, ToastsProvider } from '@/hooks';
import { makeQueryClient, StyledComponentsRegistry, NextAuthProvider } from '@/utils';

// import global styles
import '@/assets/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/assets/fonts/Monaspace/Monaspace.css';
import '@/app/globals.css'; // Will load tailwindcss styles

// Global level providers
const Providers = ({ children }: any) => {
  const queryClient = makeQueryClient();
  useDynamicDocTitle(DocConfig);

  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <NextAuthProvider>
            <DevToolsProvider>
              <ToastsProvider>
                {children}
              </ToastsProvider>
            </DevToolsProvider>
          </NextAuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
