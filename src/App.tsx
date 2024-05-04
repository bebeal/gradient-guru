import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Router } from '@/routes';
import { makeQueryClient } from '@/utils/react-query';

import '@/index.css';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = makeQueryClient();
  // useDynamicDocTitle(DocConfig);
  return (
    <QueryClientProvider client={queryClient}>
      <main className="relative h-screen w-screen overflow-auto bg-primary text-primary">{children}</main>
    </QueryClientProvider>
  );
};

export const App = () => {
  return (
    <Providers>
      <Router />
    </Providers>
  );
};
