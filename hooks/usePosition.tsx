
import { isTouchDevice } from '@/utils';
import { useState, useEffect, useCallback, RefObject } from 'react';

export interface Position {
  x: number;
  y: number;
}

// Hook to track pointer (mouse or touch) position on an element (defaults to window)
// optionally returns position as percentage of element width/height
export interface usePointerPositionProps {
  containerRef?: RefObject<HTMLElement | Window>;
  touchEvents: boolean;
  percentage: boolean;
};
export const usePointerPosition = ({
    containerRef = { current: window },
    touchEvents = true,
    percentage = true,
}: usePointerPositionProps): Position => {
  const [pointerPosition, setPointerPosition] = useState<Position>({ x: 0, y: 0 });

  // if percentage: calculate position as percentage of element width/height
  const calculatePosition = useCallback((x: number, y: number, element: HTMLElement | Window) => {
    if (percentage) {
      const width = 'innerWidth' in element ? element.innerWidth : element.clientWidth;
      const height = 'innerHeight' in element ? element.innerHeight : element.clientHeight;
      return { x: (x / width) * 100, y: (y / height) * 100 };
    } else {
      return { x, y };
    }
  }, [percentage]);

  const updatePosition = useCallback((event: Event) => {
    if (!containerRef?.current) return;
    let x = 0;
    let y = 0;
    const element = containerRef?.current;
    const rect = element instanceof HTMLElement ? element.getBoundingClientRect() : undefined;
    // Resolve event to be MouseEvent or TouchEvent
    const isTouchEvent = (e: Event): e is TouchEvent => 'touches' in e;
    if (isTouchEvent(event) && event.touches.length > 0) {
      x = event.touches[0].clientX - (rect ? rect.left : 0);
      y = event.touches[0].clientY - (rect ? rect.top : 0);
    } else if (event instanceof MouseEvent) {
      x = event.clientX - (rect ? rect.left : 0);
      y = event.clientY - (rect ? rect.top : 0);
    }
    const updatedPosition = calculatePosition(x, y, element);
    setPointerPosition(updatedPosition);
  }, [containerRef, calculatePosition]);

  useEffect(() => {
    if (!containerRef?.current) return;
    const element = containerRef?.current;
    const eventListenerOptions = { passive: true };
    element.addEventListener('mousemove', updatePosition as EventListener, eventListenerOptions);
    if (touchEvents && isTouchDevice()) {
      element.addEventListener('touchmove', updatePosition as EventListener, eventListenerOptions);
    }
    return () => {
      element.removeEventListener('mousemove', updatePosition as EventListener);
      if (touchEvents && isTouchDevice()) {
        element.removeEventListener('touchmove', updatePosition as EventListener);
      }
    };
  }, [containerRef, touchEvents, updatePosition]);

  return pointerPosition;
};
