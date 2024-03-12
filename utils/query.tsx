import { QueryClient } from '@tanstack/react-query';
import { lazy } from 'react';

export const makeQueryClient = (overrideOptions?: any) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000,
      },
    },
    ...overrideOptions,
  });
};

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)
