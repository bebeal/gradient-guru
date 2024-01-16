'use client'

// hook for interacting with nextjs server api routes

import { useCallback, useState } from "react";

export type Api = 'listVersions' | 'getS3' | 'putS3' | 'listFilesFromDrive';

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = useCallback(async (api: Api, body: any = {}, method: string = 'POST', headers: any = { 'Content-Type': 'application/json' }) => {
    setIsLoading(true);
    const response = await fetch(`/api/${api}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });
    setIsLoading(false);

    if (!response.ok) {
      return {
        ...response,
        title: `Error calling ${api}`,
        message: `${response.statusText}`
      }
    }
    return await response.json();
  }, []);

  return {
    isLoading,
    handleRequest,
    listVersions: (body?: any) => handleRequest('listVersions', body),
    getS3: (body?: any) => handleRequest('getS3', body),
    putS3: (body?: any) => handleRequest('putS3', body),
    listFilesFromDrive: (body?: any) => handleRequest('listFilesFromDrive', body),
  }
};
