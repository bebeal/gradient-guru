'use client';

import { DocTitleConfig } from '@/app/doc-config';
import { ThemeProvider, useDynamicDocTitle } from '@/hooks';
import { StyledComponentsRegistry } from '@/utils';
// import global styles
import '@/assets/fonts/BerkeleyMono/BerkeleyMono.css';
import '@/assets/fonts/Monaspace/Monaspace.css';
import '@/app/globals.css';

// Global level providers
const Providers = ({ children }: any) => {
  useDynamicDocTitle(DocTitleConfig);

  return (
    <StyledComponentsRegistry>
      <ThemeProvider>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
