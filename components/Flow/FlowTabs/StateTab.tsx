'use client';

import { useCallback } from 'react';
import { Accordion, FlowTab, Form, Title } from '@/components';
import { ContentRecorderContextType, useContentRecorder } from '@/hooks';
import { cn } from '@/utils';

export const StateTab = () => {
  const contentRecorder: ContentRecorderContextType = useContentRecorder();

  const UIStateAccordion = useCallback(() => {
    return {
      name: <Title>UI State</Title>,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center`)}>
          <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
            {Object.keys(contentRecorder?.uiState).length > 0 ? <Form object={contentRecorder?.uiState} readOnly={true} /> : <div className="text-primary/80 px-2 py-4">No UI State</div>}
          </div>
        </div>
      ),
      open: true,
    };
  }, [contentRecorder?.uiState]);

  const CanvasStateAccordion = useCallback(() => {
    return {
      name: <Title>Canvas State</Title>,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center overflow-auto`)}>
          <div className="flex p-1 flex-wrap flex-col w-full h-full justify-center items-center">
            {Object.keys(contentRecorder?.canvasState).length > 0 ? <Form object={contentRecorder?.canvasState} readOnly={true} /> : <div className="text-primary/80 px-2 py-4">No Canvas Event</div>}
          </div>
        </div>
      ),
      open: true,
    };
  }, [contentRecorder?.canvasState]);

  return (
    <FlowTab title="State">
      <Accordion className={cn(`p-1`)} spaceBetween={16} items={[UIStateAccordion(), CanvasStateAccordion()]} />
    </FlowTab>
  );
};
StateTab.displayName = 'StateTab';
