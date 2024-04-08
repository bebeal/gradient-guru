'use client';

import { FC } from 'react';
import { Button, Icon } from '@/components';
import { ToastContextType, useToasts } from '@/hooks';

const ToastsPage: FC = () => {
  const { toasts, addToast, clearToasts, simulateSwipeRightGesture }: ToastContextType = useToasts();

  // make buttons for each of these
  const AddToastButton = (...args: any) => {
    const defaultArgs = {
      icon: <Icon set="Carbon" icon="DataEnrichmentAdd" />,
      title: 'Example Title',
      description: 'Example Description',
      keepOpen: true,
      closeLabel: 'Close',
    };
    return (
      <Button className="w-[180px] [justify-content:flex-start_!important]" variant="classic" onClick={() => addToast({ ...defaultArgs, ...args })}>
        <Icon set="Carbon" icon="DataEnrichmentAdd" /> Add Toast
      </Button>
    );
  };

  const RemoveToastButton = ({ id , disabled=false}: { id?: string, disabled: boolean }) => {
    const optionalProps = {
      highContrast: disabled,
    }
    return (
      <Button className="w-[180px] [justify-content:flex-start_!important]" variant={"classic"} {...optionalProps} onClick={() => simulateSwipeRightGesture(id)} disabled={disabled}>
        <Icon set="Carbon" icon="TrashCan" /> Remove Toast
      </Button>
    );
  };

  const ClearToastsButton = () => {
    return (
      <Button className="w-[180px] [justify-content:flex-start_!important]" variant="classic" onClick={() => clearToasts()}>
       <Icon set="Carbon" icon="MisuseOutline" /> Clear Toasts
      </Button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary text-primary">
      <div className="flex flex-col items-center justify-center gap-4 w-full h-[400px]">
        <ClearToastsButton />
        <AddToastButton />
        <RemoveToastButton disabled={toasts.length === 0} />
      </div>
    </div>
  );
};

export default ToastsPage;
