'use client';

import { ThemeProvider, useDynamicDocTitle } from '@/hooks';
import { StyledComponentsRegistry } from '@/utils';
import { DocTitleConfig } from '@/app/doc-config';

// import global styles
import '@/app/globals.css';

// Global level providers
const Providers = ({ children }: any) => {
  useDynamicDocTitle(DocTitleConfig);

  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
