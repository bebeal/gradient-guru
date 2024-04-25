import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from '@/404';
import { DevToolsProvider } from '@/hooks/useDevTools';
import { ThemeProvider } from '@/hooks/useTheme';
import Root from '@/pages/page';
import { DynamicPages, ErrorBoundary } from '@/utils/pages';
import { makeQueryClient } from '@/utils/react-query';
import { ToastsProvider } from './hooks/useToasts';
import { QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const router = createBrowserRouter([
  { path: '/', element: <Root />, errorElement: <ErrorBoundary /> },
  { path: '/*', element: <DynamicPages />, errorElement: <ErrorBoundary /> },
  { path: '*', element: <NotFoundPage />, errorElement: <ErrorBoundary /> },
]);

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = makeQueryClient();
  // useDynamicDocTitle(DocConfig);
  return (
    <React.StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <DevToolsProvider>
            <ToastsProvider>
              <main className="relative h-screen w-screen overflow-auto bg-primary text-primary">{children}</main>
            </ToastsProvider>
          </DevToolsProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>,
);
