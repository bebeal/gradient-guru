'use client';

import { useCallback } from 'react';
import { Accordion, BulletedList, FlowTab, Form, TabTitle, TimelineScrubber, ToggleTitle } from '@/components';
import { ContentRecorderContextType, useContentExtractor, useContentRecorder } from '@/hooks';
import { cn } from '@/utils';

export const FlowStateTab = () => {
  const contentRecorder: ContentRecorderContextType = useContentRecorder();
  const contentExtractor = useContentExtractor();

  const UIStateAccordion = useCallback(() => {
    const { enabled, ...config } = contentExtractor.uiStateConfig;
    const hasConfig = Object.keys(config).length > 0;
    return {
      name: <ToggleTitle title="UI State" pressed={contentExtractor.uiStateConfig.enabled} onPressedChange={(enabled: boolean) => contentExtractor.setUiStateConfig({ ...contentExtractor.uiStateConfig, enabled })} />,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center`)}>
          {hasConfig && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={config} schema={contentExtractor.getUiEventSchema()} onSubmit={(newUiStateConfig: any) => contentExtractor.setUiStateConfig({ ...contentExtractor.uiStateConfig, ...newUiStateConfig })} />
            </div>
          )}
          <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
            {hasConfig && <TabTitle className={cn(`text-md w-full`)}>State</TabTitle>}
            {Object.keys(contentRecorder?.uiState).length > 0 ? <Form object={contentRecorder?.uiState} readOnly={true} /> : <div className="text-primary/80 px-2 py-4">No UI State</div>}
          </div>
        </div>
      ),
      open: true,
    };
  }, [contentRecorder?.uiState, contentExtractor]);

  const CanvasStateAccordion = useCallback(() => {
    const { enabled, ...config } = contentExtractor.canvasStateConfig;
    const hasConfig = Object.keys(config).length > 0;
    return {
      name: <ToggleTitle title="Canvas State" pressed={contentExtractor.canvasStateConfig.enabled} onPressedChange={(enabled: boolean) => contentExtractor.setCanvasStateConfig({ ...contentExtractor.canvasStateConfig, enabled })} />,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center overflow-auto`)}>
          {hasConfig && (
            <div className="flex p-1 flex-wrap flex-col w-full h-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={config} schema={contentExtractor.getCanvasEventSchema()} onSubmit={(newCanvasEventConfig: any) => contentExtractor.setCanvasStateConfig({ ...contentExtractor.canvasStateConfig, ...newCanvasEventConfig })} />
            </div>
          )}
          <div className="flex p-1 flex-wrap flex-col w-full h-full justify-center items-center">
            {hasConfig && <TabTitle className={cn(`text-md w-full`)}>State</TabTitle>}
            {Object.keys(contentRecorder?.canvasState).length > 0 ? <Form object={contentRecorder?.canvasState} readOnly={true} /> : <div className="text-primary/80 px-2 py-4">No Canvas Event</div>}
          </div>
        </div>
      ),
      open: true,
    };
  }, [contentRecorder?.canvasState, contentExtractor]);

  const HistoryRecordsAccordion = useCallback(() => {
    const { enabled, ...config } = contentExtractor.historyRecordsConfig;
    const hasConfig = Object.keys(config).length > 0;
    return {
      name: (
        <ToggleTitle title="History" pressed={contentExtractor.historyRecordsConfig.enabled} onPressedChange={(enabled: boolean) => contentExtractor.setHistoryRecordsConfig({ ...contentExtractor.historyRecordsConfig, enabled })} />
      ),
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center`)}>
          {hasConfig && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form
                object={config}
                schema={contentExtractor.getHistoryRecordsSchema()}
                onSubmit={(newHistoryRecordsConfig: any) => contentExtractor.setHistoryRecordsConfig({ ...contentExtractor.historyRecordsConfig, ...newHistoryRecordsConfig })}
              />
            </div>
          )}
          <div className="flex p-1 flex-col w-full h-full justify-center items-center overflow-auto">
            <TabTitle className={cn(`text-md w-full`)}>Scrubber</TabTitle>
            <TimelineScrubber events={contentRecorder.historyRecords} />
            <TabTitle className={cn(`text-md w-full`)}>Records</TabTitle>
            {contentRecorder?.historyRecords.length > 0 ? <BulletedList className="max-h-[125px]" items={contentRecorder?.getReadableHistoryRecords()} /> : <div className="text-primary/80 px-2 py-4">No Records</div>}
          </div>
        </div>
      ),
      open: true,
    };
  }, [contentRecorder, contentExtractor]);

  return (
    <FlowTab title="State">
      <Accordion className={cn(`p-1`)} spaceBetween={16} items={[UIStateAccordion(), CanvasStateAccordion(), HistoryRecordsAccordion()]} />
    </FlowTab>
  );
};
FlowStateTab.displayName = 'FlowStateTab';
