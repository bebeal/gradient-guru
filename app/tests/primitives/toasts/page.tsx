'use client';

import { FC } from 'react';
import { Button, Icon } from '@/components';
import { ToastContextType, useToasts } from '@/hooks';

const ToastsPage: FC = () => {
  const { toasts, addToast, clearToasts, simulateSwipeRightGesture }: ToastContextType = useToasts();

  // make buttons for each of these
  const AddToastButton = (...args: any) => {
    const defaultArgs = {
      icon: <div className="min-w-[1rem] min-h-[1rem]"><Icon set="Carbon" icon="DataEnrichmentAdd" /></div>,
      title: 'Example Title',
      description: 'Example Description',
      keepOpen: true,
      closeLabel: 'Close',
    };
    return (
      <Button variant="classic" onClick={() => addToast({ ...defaultArgs, ...args })}>
        Add Toast
      </Button>
    );
  };

  const RemoveToastButton = ({ id , disabled=false}: { id?: string, disabled: boolean }) => {
    const optionalProps = {
      highContrast: disabled,
    }
    return (
      <Button variant={"classic"} {...optionalProps} onClick={() => simulateSwipeRightGesture(id)} disabled={disabled}>
        Remove Toast
      </Button>
    );
  };

  const ClearToastsButton = () => {
    return (
      <Button variant="classic" onClick={() => clearToasts()}>
        Clear Toasts
      </Button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary text-primary">
      <div className="flex flex-col items-center justify-center gap-4 w-[150px] h-[400px]">
        <ClearToastsButton />
        <AddToastButton />
        <RemoveToastButton disabled={toasts.length === 0} />
      </div>
    </div>
  );
};

export default ToastsPage;
