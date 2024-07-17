'use client';

import { ReactNode, useCallback, useState } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { useToasts } from '@/hooks';
import { Button } from './Button';
import { cn } from '@/utils';

export const defaultToastTimeout = 3000;

export interface ToastAction {
  type: 'primary' | 'danger' | 'normal';
  label: string;
  onClick: (event?: any) => void;
}

export interface IToast {
  id: string;
  icon?: any;
  title?: string;
  description?: any | ReactNode | string;
  actions?: ToastAction[];
  keepOpen?: boolean;
  duration?: number;
  closeLabel?: string;
}

export interface ToastProps {
  toast: IToast;
}
export const Toast = ({ toast }: ToastProps) => {
  const { removeToast, simulateSwipeRightGesture } = useToasts();
  const [pointerDownTime, setPointerDownTime] = useState<number | null>(null);

  const handlePointerDown = () => {
    setPointerDownTime(Date.now());
  };

  const handlePointerUp = () => {
    const clickDuration = Date.now() - (pointerDownTime || Date.now());
    // only close toast if was an actual click, not a drag, indicated by time diff between the mouse click down vs the mouse click up
    if (clickDuration < 500) {
      // removeToast(toast.id);
      simulateSwipeRightGesture(toast.id);
    }
    setPointerDownTime(null); // Reset the pointer down time
  };

  const onOpenChange = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      removeToast(toast.id);
    }
  }, [toast, removeToast]);

  return (
    <ToastPrimitive.Root
      id={toast.id}
      onOpenChange={onOpenChange}
      className={cn(
        "relative min-w-[200px] flex flex-row bg-secondary border border-primary shadow-md rounded h-auto",
        "cursor-pointer",
        "data-[state=open]:animate-slide-in",
        "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
        "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]",
        // Depnds on swipeDirection set from the Provider
        "data-[swipe=end]:animate-swipe-right",
        "data-[swipe=end]:[&[data-swipe-direction=left]]:animate-swipe-left",
        "data-[swipe=end]:[&[data-swipe-direction=up]]:animate-swipe-up",
        "data-[swipe=end]:[&[data-swipe-direction=down]]:animate-swipe-down",
        "data-[state=closed]:animate-hide",
      )}
      duration={toast.keepOpen ? Infinity : toast?.duration || defaultToastTimeout}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {toast.icon && <div className="pl-2 pt-2 text-primary h-auto flex align-top justify-start">
        {toast.icon}
      </div>}
      <div className="flex-grow-[2] max-w-[280px] overflow-auto">
        <div className="p-3 flex flex-col gap-3">
          {toast.title && <ToastPrimitive.Title className="text-sm font-bold">{toast.title}</ToastPrimitive.Title>}
          {toast.description && <ToastPrimitive.Description className="text-primary p-0 m-0">{toast.description}</ToastPrimitive.Description>}
        </div>
        {toast.actions && (
          <div className="flex justify-[flex-start] ml-0 pl-0">
            {toast.actions.map((action, i) => (
              <ToastPrimitive.Action key={i} altText={action.label} asChild onClick={action.onClick}>
                <Button type={action.type}>{action.label}</Button>
              </ToastPrimitive.Action>
            ))}
            <ToastPrimitive.Close asChild>
              <div className="py-3 align-[flex-end] flex flex-col">
                <Button type="normal" variant="classic" className="py-3 flex w-auto h-auto [align-self:flex-end] appearance-auto items-center flex-shrink-0 ml-auto">
                  {toast.closeLabel ?? 'Close'}
                </Button>
              </div>
            </ToastPrimitive.Close>
          </div>
        )}
      </div>
    </ToastPrimitive.Root>
  );
};

