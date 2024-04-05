'use client';

import { createContext, memo, useCallback, useContext, useEffect, useState } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { nanoid } from 'nanoid';
import { IToast, Toast } from '@/components';

export const Toasts = memo(() => {
  const { toasts } = useToasts();

  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </>
  );
});

export const ToastViewport = () => {
  const { toasts } = useToasts();
  const [hasToasts, setHasToasts] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (toasts.length) {
      setHasToasts(true);
    } else {
      setTimeout(() => {
        if (!cancelled) {
          setHasToasts(false);
        }
      }, 800);
    }

    return () => {
      cancelled = true;
    };
  }, [toasts]);

  if (!hasToasts) return null;

  return <ToastPrimitive.ToastViewport className="absolute inset-0 m-0 flex items-end justify-end flex-col gap-3 [&>*]:pointer-events-auto p-[0px_8px_18px_0px] z-[var(--layer-toasts)] pointer-events-none" />;
};

export type ToastContextType = {
  addToast: (toast: Omit<IToast, 'id'> & { id?: string }) => string;
  removeToast: (id?: IToast['id']) => string;
  clearToasts: () => void;
  simulateSwipeRightGesture: (id?: IToast['id']) => string | undefined | null;
  toasts: IToast[];
};
export const ToastsContext = createContext({} as ToastContextType);

export type ToastsProviderProps = {
  children: ReactNode;
};
export const ToastsProvider = ({ children }: ToastsProviderProps) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = useCallback((toast: Omit<IToast, 'id'> & { id?: string }) => {
    const id = toast.id ?? nanoid();
    setToasts((d) => [...d.filter((m) => m.id !== toast.id), { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback(
    (id?: string) => {
      // if id not provided, assume remove the oldest toast
      const idToRemove = id || toasts[0]?.id;
      setToasts((d) => d.filter((m) => m.id !== idToRemove));
      return idToRemove; // return id of the removed toast
    },
    [toasts],
  );

  // alternative way to remove toasts with exit animation
  const simulateSwipeRightGesture = useCallback(
    (id?: string): string | undefined | null => {
      const idToRemove = id || toasts[0]?.id;
      if (!idToRemove) return null; // Early return if no ID is determined
      const toastToRemove = document.getElementById(idToRemove);
      if (toastToRemove) {
        // Simulate a swipe right gesture
        toastToRemove?.setAttribute('data-swipe', 'end');
        // on animation end then remove toast
        toastToRemove?.addEventListener('animationend', () => {
          removeToast(idToRemove);
        });
      }
      return idToRemove;
    },
    [removeToast, toasts],
  );

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastPrimitive.ToastProvider swipeDirection="right">
      <ToastsContext.Provider value={{ toasts, addToast, removeToast, clearToasts, simulateSwipeRightGesture }}>
        {children}
        <Toasts />
        <ToastViewport />
      </ToastsContext.Provider>
    </ToastPrimitive.ToastProvider>
  );
};

export const useToasts = () => {
  const ctx = useContext(ToastsContext);
  if (!ctx) {
    throw new Error('useToasts must be used within a ToastsProvider');
  }
  return ctx;
};
