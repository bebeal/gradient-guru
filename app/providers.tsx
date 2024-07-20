'use client';

import { ThemeProvider, ToastsProvider, useDynamicDocTitle } from '@/hooks';
import { makeQueryClient } from '@/utils/react-query';
import { NextAuthProvider } from '@/utils/auth';
import { StyledComponentsRegistry } from '@/utils/StyledComponentRegistry';
import { QueryClientProvider } from '@tanstack/react-query';

// import global styles
import '@/app/globals.css'; // Will load tailwindcss styles
import '@/public/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/public/fonts/Monaspace/Monaspace.css';
import { DocConfig } from './config';
import { useShortcuts } from '@/hooks/useShortcuts';

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
