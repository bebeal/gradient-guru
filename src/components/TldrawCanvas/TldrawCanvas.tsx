import { useEffect } from 'react';
import { nanoid } from '@/utils/utils';
import { setUserPreferences, Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

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
