'use client';

import { IDocTitleConfig, useDynamicDocTitle } from '@/hooks';

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

  return <>{children}</>;
};

export default Providers;
