// Provides an easy way to load pages which were migrated from an file based app router (e.g. Next.js)

import { lazy, Suspense } from 'react';
import { isRouteErrorResponse, useLocation, useRouteError } from 'react-router-dom';
import NotFoundPage from '@/NotFound';
import { Loading } from '@/components/Primitives/Loading';

// It uses the url as a path, and will try to load the component from the file-system via dynamic import and render it.
export const DynamicPages = () => {
  const location = useLocation();

  const DynamicPage = lazy(async () => {
    const path = location.pathname.replace(/^\/|\/$/g, '');
    const fullPath = `../pages/${path ? path + '/' : ''}page.tsx`;
    try {
      return await import(/* @vite-ignore */ fullPath);
    } catch (error) {
      console.error('Dynamic component loading failed:', error);
      return Promise.resolve({ default: NotFoundPage });
    }
  });

  return (
    <Suspense fallback={<Loading className="w-full h-full" />}>
      <DynamicPage />
    </Suspense>
  );
};

export const ErrorBoundary = () => {
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
  const stack = error instanceof Error ? error.stack : null;
  return (
    <div className="bg-gray-300 p-5 rounded-md shadow-lg flex flex-col gap-1">
      <h3 className="text-red-700 text-lg font-bold">Unexpected Application Error!</h3>
      <h3 className="text-red-600">{message}</h3>
      {stack && <pre className="p-2 bg-red-100 rounded-md overflow-auto text-gray-700">{stack}</pre>}
    </div>
  );
};
