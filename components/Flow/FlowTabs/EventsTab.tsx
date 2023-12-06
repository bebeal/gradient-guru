import { useCallback } from 'react';
import { Accordion, BulletedList, FlowTab, Form, TabTitle, TimelineScrubber, ToggleTitle } from '@/components';
import { FlowEventsRecorderContextType, useFlowEventsRecorder, useFlowExtractor } from '@/hooks';
import { cn } from '@/utils';

export type EventsTabProps = {
};
export const EventsTab = (props: EventsTabProps) => {
  const {
    ...rest
  } = props;
  const flowEvents: FlowEventsRecorderContextType = useFlowEventsRecorder();
  const flowExtractor = useFlowExtractor();

  const UIStateAccordion = useCallback(() => {
    const { enabled, ...config } = flowExtractor.uiEventConfig;
    const hasConfig = Object.keys(config).length > 0;
    return {
      name: <ToggleTitle title="UI State" pressed={flowExtractor.uiEventConfig.enabled} onPressedChange={(enabled: boolean) => flowExtractor.setUiEventConfig({ ...flowExtractor.uiEventConfig, enabled })} />,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-center items-center`)}>
          {hasConfig && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={config} schema={flowExtractor.getUiEventSchema()} onSubmit={(newUiEventConfig: any) => flowExtractor.setUiEventConfig({...flowExtractor.uiEventConfig, ...newUiEventConfig})} />
            </div>
          )}
          <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
          {hasConfig && <TabTitle className={cn(`text-md w-full`)}>State</TabTitle>}
            {flowEvents?.uiEvents?.length > 0 ? <Form object={flowEvents?.uiEvents[0]} readOnly={true} /> : <div className="text-primary/80 px-2 py-4">No UI State</div>}
          </div>
        </div>
      ),
      open: true,
    }
  }, [flowEvents?.uiEvents, flowExtractor]);

  const HistoryRecordsAccordion = useCallback(() => {
    const { enabled, ...config } = flowExtractor.historyRecordsConfig;
    const hasConfig = Object.keys(config).length > 0;
    return {
      name: <ToggleTitle title="History Records" pressed={flowExtractor.historyRecordsConfig.enabled} onPressedChange={(enabled: boolean) => flowExtractor.setHistoryRecordsConfig({ ...flowExtractor.historyRecordsConfig, enabled })} />,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-center items-center`)}>
          {hasConfig && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={config} schema={flowExtractor.getHistoryRecordsSchema()} onSubmit={(newHistoryRecordsConfig: any) => flowExtractor.setHistoryRecordsConfig({...flowExtractor.historyRecordsConfig, ...newHistoryRecordsConfig})} />
            </div>
          )}
          <div className="flex p-1 flex-col w-full h-full justify-center items-center overflow-auto">
            <TabTitle className={cn(`text-md w-full`)}>Timeline Scrubber</TabTitle>
            <TimelineScrubber events={flowEvents.historyRecords} />
            <TabTitle className={cn(`text-md w-full`)}>Records</TabTitle>
            {flowEvents?.historyRecords.length > 0 ? <BulletedList className="max-h-[125px]" items={flowEvents?.getHistoryRecords()} /> : <div className="text-primary/80 px-2 py-4">No Records</div>}
          </div>
        </div>
      ),
      open: true,
    }
  }, [flowEvents, flowExtractor]);

  const CanvasEventAccordion = useCallback(() => {
    const { enabled, ...config } = flowExtractor.canvasEventConfig;
    const hasConfig = Object.keys(config).length > 0;
    return {
      name: <ToggleTitle title="Canvas Event" pressed={flowExtractor.canvasEventConfig.enabled} onPressedChange={(enabled: boolean) => flowExtractor.setCanvasEventConfig({ ...flowExtractor.canvasEventConfig, enabled })} />,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-center items-center overflow-auto`)}>
          {hasConfig && (
            <div className="flex p-1 flex-wrap flex-col w-full h-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={config} schema={flowExtractor.getCanvasEventSchema()} onSubmit={(newCanvasEventConfig: any) => flowExtractor.setCanvasEventConfig({...flowExtractor.canvasEventConfig, ...newCanvasEventConfig})} />
            </div>
          )}
          <div className="flex p-1 flex-wrap flex-col w-full h-full justify-center items-center">
          {hasConfig && <TabTitle className={cn(`text-md w-full`)}>State</TabTitle>}
            {flowEvents?.canvasEvent ? <Form object={flowEvents?.canvasEvent} readOnly={true} /> : <div className="text-primary/80 px-2 py-4">No Canvas Event</div>}
          </div>
        </div>
      ),
      open: true,
    }
  }, [flowEvents?.canvasEvent, flowExtractor]);

  return (
    <FlowTab title="Events">
      <Accordion className={cn(`p-1`)} spaceBetween={16} items={[UIStateAccordion(), HistoryRecordsAccordion(), CanvasEventAccordion()]} />
    </FlowTab>
  )
};
EventsTab.displayName = 'EventsTab';
