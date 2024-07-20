'use client';

import { DocConfig } from '@/app/config';
import { ThemeProvider, ToastsProvider, useDynamicDocTitle } from '@/hooks';
import { makeQueryClient } from '@/utils/react-query';
import { NextAuthProvider } from '@/utils/auth';
import { StyledComponentsRegistry } from '@/utils/StyledComponentRegistry';
import { QueryClientProvider } from '@tanstack/react-query';

// import global styles
import '@/app/globals.css'; // Will load tailwindcss styles
import '@/public/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/public/fonts/Monaspace/Monaspace.css';

// Global level providers
const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = makeQueryClient();
  useDynamicDocTitle(DocConfig);

  return (
    <NextAuthProvider>
      <StyledComponentsRegistry>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <ToastsProvider>
              {children}
            </ToastsProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </NextAuthProvider>
  );
};

export default Providers;
