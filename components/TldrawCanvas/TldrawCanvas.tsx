'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { setUserPreferences } from 'tldraw';
import { nanoid } from '@/utils';
import 'tldraw/tldraw.css';

const Tldraw = dynamic(async () => (await import('tldraw')).Tldraw, { ssr: false });

export interface TldrawCanvasProps {}

export const TldrawCanvas = () => {
  useEffect(() => {
    const setInitialUserPreferences = async () => {
      setUserPreferences({ id: nanoid(), isDarkMode: true });
    };
    setInitialUserPreferences();
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw />
    </div>
  );
};
