'use client';

import { IDocTitleConfig, useDynamicDocTitle } from '@/hooks';
import { StyledComponentsRegistry } from '@/utils';

// import global styles
import '@/app/globals.css';

const DocTitleConfig: IDocTitleConfig = {
  title: 'App',
  shorthand: 'app',
  separator: '•',
};

// Global level providers
const Providers = ({ children }: any) => {
  useDynamicDocTitle(DocTitleConfig);

  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};

export default Providers;
