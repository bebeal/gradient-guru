'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, ToastsProvider, useDynamicDocTitle } from '@/hooks';
import { NextAuthProvider } from '@/utils/auth';
import { makeQueryClient } from '@/utils/react-query';
import { StyledComponentsRegistry } from '@/utils/StyledComponentRegistry';
// import global styles
import '@/app/globals.css'; // Will load tailwindcss styles
import '@/public/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/public/fonts/Monaspace/Monaspace.css';
import { useShortcuts } from '@/hooks/useShortcuts';
import { DocConfig } from './config';

// Global level providers
const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = makeQueryClient();
  return (
    <NextAuthProvider>
      <StyledComponentsRegistry>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <ToastsProvider>
              <WithProviderContext>{children}</WithProviderContext>
            </ToastsProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </NextAuthProvider>
  );
};

// so that hooks here can use the provided context
const WithProviderContext = ({ children }: { children: React.ReactNode }) => {
  useDynamicDocTitle(DocConfig);
  useShortcuts();

  return <>{children}</>;
};

export default Providers;
