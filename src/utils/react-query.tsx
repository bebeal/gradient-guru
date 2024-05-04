import { QueryClient } from '@tanstack/react-query';

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
