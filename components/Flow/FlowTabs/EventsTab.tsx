import { useCallback } from 'react';
import { Accordion, BulletedList, FlowTab, Form, TabTitle, TimelineScrubber, ToggleTitle } from '@/components';
import { ContentRecorderContextType, useContentRecorder, useContentExtractor } from '@/hooks';
import { cn } from '@/utils';

export type EventsTabProps = {
};
export const EventsTab = (props: EventsTabProps) => {
  const {
    ...rest
  } = props;
  const contentRecorder: ContentRecorderContextType = useContentRecorder();
  const contentExtractor = useContentExtractor();

  const UIStateAccordion = useCallback(() => {
    const { enabled, ...config } = contentExtractor.uiEventConfig;
    const hasConfig = Object.keys(config).length > 0;
    return {
      name: <ToggleTitle title="UI State" pressed={contentExtractor.uiEventConfig.enabled} onPressedChange={(enabled: boolean) => contentExtractor.setUiEventConfig({ ...contentExtractor.uiEventConfig, enabled })} />,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center`)}>
          {hasConfig && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={config} schema={contentExtractor.getUiEventSchema()} onSubmit={(newUiEventConfig: any) => contentExtractor.setUiEventConfig({...contentExtractor.uiEventConfig, ...newUiEventConfig})} />
            </div>
          )}
          <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
          {hasConfig && <TabTitle className={cn(`text-md w-full`)}>State</TabTitle>}
            {contentRecorder?.uiEvents?.length > 0 ? <Form object={contentRecorder?.uiEvents[0]} readOnly={true} /> : <div className="text-primary/80 px-2 py-4">No UI State</div>}
          </div>
        </div>
      ),
      open: true,
    }
  }, [contentRecorder?.uiEvents, contentExtractor]);

  const HistoryRecordsAccordion = useCallback(() => {
    const { enabled, ...config } = contentExtractor.historyRecordsConfig;
    const hasConfig = Object.keys(config).length > 0;
    return {
      name: <ToggleTitle title="History Records" pressed={contentExtractor.historyRecordsConfig.enabled} onPressedChange={(enabled: boolean) => contentExtractor.setHistoryRecordsConfig({ ...contentExtractor.historyRecordsConfig, enabled })} />,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center`)}>
          {hasConfig && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={config} schema={contentExtractor.getHistoryRecordsSchema()} onSubmit={(newHistoryRecordsConfig: any) => contentExtractor.setHistoryRecordsConfig({...contentExtractor.historyRecordsConfig, ...newHistoryRecordsConfig})} />
            </div>
          )}
          <div className="flex p-1 flex-col w-full h-full justify-center items-center overflow-auto">
            <TabTitle className={cn(`text-md w-full`)}>Timeline Scrubber</TabTitle>
            <TimelineScrubber events={contentRecorder.historyRecords} />
            <TabTitle className={cn(`text-md w-full`)}>Records</TabTitle>
            {contentRecorder?.historyRecords.length > 0 ? <BulletedList className="max-h-[125px]" items={contentRecorder?.getHistoryRecords()} /> : <div className="text-primary/80 px-2 py-4">No Records</div>}
          </div>
        </div>
      ),
      open: true,
    }
  }, [contentRecorder, contentExtractor]);

  const CanvasEventAccordion = useCallback(() => {
    const { enabled, ...config } = contentExtractor.canvasEventConfig;
    const hasConfig = Object.keys(config).length > 0;
    return {
      name: <ToggleTitle title="Canvas Event" pressed={contentExtractor.canvasEventConfig.enabled} onPressedChange={(enabled: boolean) => contentExtractor.setCanvasEventConfig({ ...contentExtractor.canvasEventConfig, enabled })} />,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center overflow-auto`)}>
          {hasConfig && (
            <div className="flex p-1 flex-wrap flex-col w-full h-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={config} schema={contentExtractor.getCanvasEventSchema()} onSubmit={(newCanvasEventConfig: any) => contentExtractor.setCanvasEventConfig({...contentExtractor.canvasEventConfig, ...newCanvasEventConfig})} />
            </div>
          )}
          <div className="flex p-1 flex-wrap flex-col w-full h-full justify-center items-center">
          {hasConfig && <TabTitle className={cn(`text-md w-full`)}>State</TabTitle>}
            {contentRecorder?.canvasEvent ? <Form object={contentRecorder?.canvasEvent} readOnly={true} /> : <div className="text-primary/80 px-2 py-4">No Canvas Event</div>}
          </div>
        </div>
      ),
      open: true,
    }
  }, [contentRecorder?.canvasEvent, contentExtractor]);

  return (
    <FlowTab title="Events">
      <Accordion className={cn(`p-1`)} spaceBetween={16} items={[UIStateAccordion(), HistoryRecordsAccordion(), CanvasEventAccordion()]} />
    </FlowTab>
  )
};
EventsTab.displayName = 'EventsTab';
