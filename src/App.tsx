import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { makeQueryClient } from '@/utils/react-query';

import '@/index.css';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = makeQueryClient();
  // useDynamicDocTitle(DocConfig);

  useEffect(() => {
    if (queryClient) {
      console.log('queryClient initialized');
    }
  }, [queryClient]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const App = () => {
  return (
    <Providers>
      <main className="relative h-screen w-screen overflow-auto bg-primary text-primary">
        <Outlet />
      </main>
    </Providers>
  );
};
