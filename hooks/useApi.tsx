'use client'

// hook for interacting with nextjs server api routes

import { useCallback, useState } from "react";

export type Api = 'getS3' | 'putS3';

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const handleError = useCallback((error: Error) => {
    setIsLoading(false);
    setError(error);
  }, []);

  const handleRequest = useCallback(async (api: Api, body?: any, method: string = 'POST', headers: any = { 'Content-Type': 'application/json' }) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch(`/api/${api}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        console.log(`api call ${api} failed:`, response);
      }
      return await response.json();
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  return {
    isLoading,
    error,
    getS3: (body?: any) => handleRequest('getS3', body),
    putS3: (body?: any) => handleRequest('putS3', body),
    handleError,
    handleRequest,
  }
};
