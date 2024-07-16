'use client'

import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

type DownloadProgressCallback = (downloadPercentage: number, bytesDownloaded: number, total?: number) => void;

export type DownloadState = 'idle' | 'pending' | 'error' | 'success';

export interface DownloaderProps {
  url?: string;
  headers?: HeadersInit;
  onDownloadProgress?: DownloadProgressCallback;
  queryOptions?: any;
  simDownload?: boolean;
  simError?: boolean;
}

export const useDownloader = (props: DownloaderProps) => {
  const {
    url,
    headers,
    onDownloadProgress,
    queryOptions,
    simDownload=false,
    simError=false,
  } = props;
  const [total, setTotal] = useState<number>(27520);
  const [bytesDownloaded, setBytesDownloaded] = useState<number>(0);
  const [targetPercentage, setTargetPercentage] = useState<number>(0);
  const [downloadPercentage, setDownloadPercentage] = useState<number>(0);
  const [status, setStatus] = useState<DownloadState>('idle');

  const update = useCallback((current: number, target: number) => {
    requestAnimationFrame(() => {
      if (current !== target) {
        const step = current < target ? 1 : -1;
        const nextPercentage = current + step;
        setDownloadPercentage(nextPercentage);
      }
    });
  }, [setDownloadPercentage]);

  const jumpTo = useCallback((percentage: number) => {
    setBytesDownloaded(percentage);
    setDownloadPercentage(percentage);
    setTargetPercentage(percentage);
  }, [setDownloadPercentage, setTargetPercentage, setBytesDownloaded]);

  const simulateDownload = useCallback(() => {
    let currentTarget = 0;
    const increment = (interval: number = 1) => {
      if (currentTarget >= 100) {
        return;
      }
      currentTarget += 1;
      setTargetPercentage(currentTarget);
      setTimeout(increment, interval);
    };
    increment();
  }, [setTargetPercentage]);
  
  const simulateError = useCallback(() => {
    let currentTarget = 0;
    const increment = (interval: number = 1) => {
      if (currentTarget >= 40) {
        jumpTo(40);
        setStatus('error');
        return;
      }
      currentTarget += 1;
      setTargetPercentage(currentTarget);
      setTimeout(increment, interval);
    }
    increment();
  }, [jumpTo, setTargetPercentage]);

 const downloadFile = useCallback(async () => {
  if (!url) {
    if (simDownload) return simulateDownload();
    if (simError) return simulateError();
    return;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });
  const contentLength = +response.headers.get("Content-Length")!;
  setTotal(parseInt(contentLength.toString() || '100'));

    let loaded = 0;
    const reader = response.body?.getReader();
    if (!reader) return;

    const stream = new ReadableStream({
      async start(controller) {
        const done = false;
        while (!done) {
          const { done, value } = await reader.read();
          if (done) break;
          loaded += value?.length || 0;
          setBytesDownloaded(loaded);
          const currentdownloadPercentage = total ? (loaded / total) * 100 : 0;
          setTargetPercentage(Math.floor(Math.min(100, currentdownloadPercentage)));
          if (!total) setTotal(loaded);
          onDownloadProgress?.(currentdownloadPercentage, loaded, total);
          controller.enqueue(value);
        }
        controller.close();
      }
    });

    return new Response(stream).blob();
  }, [headers, onDownloadProgress, simDownload, simError, simulateDownload, simulateError, total, url]);

  const downloader = useMutation({
    mutationKey: ['download', url, headers, queryOptions],
    mutationFn: downloadFile,
    onMutate: () => {
      jumpTo(0);
      setStatus('pending');
    },
    onSuccess: () => {
      setTotal(bytesDownloaded);
      setTimeout(() => {
        setStatus('idle');
      }, 1000);
    },
    onError: () => {
      setTotal(bytesDownloaded);
      setStatus('error');
    },
    ...queryOptions,
  });

  useEffect(() => {
    if (downloadPercentage === 100 && targetPercentage === 100 && status === 'pending') {
      setStatus('success');
    }
  }, [downloadPercentage, targetPercentage, status]);

  useEffect(() => {
    update(downloadPercentage, targetPercentage);
  }, [update, downloadPercentage, targetPercentage]);

  return {
    url,
    headers,
    downloader,
    downloadPercentage,
    bytesDownloaded,
    total,
    status,
  };
};
