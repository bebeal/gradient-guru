'use client';

import { DocTitleConfig } from '@/app/doc-config';
import { useDynamicDocTitle } from '@/hooks';
import { StyledComponentsRegistry } from '@/utils';

// import global styles
import '@/app/globals.css';

// Global level providers
const Providers = ({ children }: any) => {
  useDynamicDocTitle(DocTitleConfig);

  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};

export default Providers;
