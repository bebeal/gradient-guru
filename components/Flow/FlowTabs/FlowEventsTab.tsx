import { useCallback } from 'react';
import { Accordion, BulletedList, FakeForm, FlowTab, Form, Switch, TabTitle, UnderlinedTitle } from '@/components';
import { FlowEventsRecorderContextType, useFlowEventsRecorder, useFlowExtractor } from '@/hooks';
import { cn } from '@/utils';

export type FlowEventsTabProps = {
};
export const FlowEventsTab = (props: FlowEventsTabProps) => {
  const {
    ...rest
  } = props;
  const flowEvents: FlowEventsRecorderContextType = useFlowEventsRecorder();
  const flowExtractor = useFlowExtractor();

  const UIStateAccordion = useCallback(() => {
    const { enabled, ...controls } = flowExtractor.uiEventConfig;
    return {
      name: (
        <UnderlinedTitle className={cn(`flex w-full relative h-full py-0.5 pointer-events-auto z-[1000]`)}>
          <Switch
            asChild
            pressed={flowExtractor.uiEventConfig.enabled}
            onPressedChange={(pressed: boolean) => flowExtractor.setUiEventConfig({ ...flowExtractor.uiEventConfig, enabled: pressed })}
            className='absolute left-0'
          ><div/></Switch>
          UI State
        </UnderlinedTitle>
      ),
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-center items-center`)}>
          {Object.keys(controls).length > 0 && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={controls} schema={flowExtractor.getUiEventSchema()} onSubmit={(newUiEventConfig: any) => flowExtractor.setUiEventConfig({...flowExtractor.uiEventConfig, ...newUiEventConfig})} />
            </div>
          )}
          <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
          {Object.keys(controls).length > 0 && <TabTitle className={cn(`text-md w-full`)}>State</TabTitle>}
            {flowEvents?.uiEvents?.length > 0 ? <FakeForm object={flowEvents?.uiEvents[0]} /> : <div className="text-primary/80 px-2 py-4">No UI State</div>}
          </div>
        </div>
      ),
      open: true,
    }
  }, [flowEvents?.uiEvents, flowExtractor]);

  const HistoryRecordsAccordion = useCallback(() => {
    const { enabled, ...controls } = flowExtractor.historyRecordsConfig;
    return {
      name: (
        <UnderlinedTitle className={cn(`flex w-full relative h-full py-0.5 pointer-events-auto z-[1000]`)}>
          <Switch
            asChild
            pressed={flowExtractor.historyRecordsConfig.enabled}
            onPressedChange={(pressed: boolean) => flowExtractor.setHistoryRecordsConfig({ ...flowExtractor.historyRecordsConfig, enabled: pressed })}
            className='absolute left-0'
          ><div/></Switch>
          History Records
        </UnderlinedTitle>
      ),
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-center items-center`)}>
          {Object.keys(controls).length > 0 && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={controls} schema={flowExtractor.getHistoryRecordsSchema()} onSubmit={(newHistoryRecordsConfig: any) => flowExtractor.setHistoryRecordsConfig({...flowExtractor.historyRecordsConfig, ...newHistoryRecordsConfig})} />
            </div>
          )}
          <div className="flex p-1 flex-col w-full h-full justify-center items-center overflow-auto max-h-[125px]">
          {Object.keys(controls).length > 0 && <TabTitle className={cn(`text-md w-full`)}>Records</TabTitle>}
            {flowEvents?.historyRecords.length > 0 ? <BulletedList items={flowEvents?.getHistoryRecords()} /> : <div className="text-primary/80 px-2 py-4">No Records</div>}
          </div>
        </div>
      ),
      open: true,
    }
  }, [flowEvents, flowExtractor]);

  const CanvasEventAccordion = useCallback(() => {
    const { enabled, ...controls } = flowExtractor.canvasEventConfig;
    return {
      name: (
        <UnderlinedTitle className={cn(`flex w-full relative h-full py-0.5 pointer-events-auto z-[1000]`)}>
          <Switch
            asChild
            pressed={flowExtractor.canvasEventConfig.enabled}
            onPressedChange={(pressed: boolean) => flowExtractor.setCanvasEventConfig({ ...flowExtractor.canvasEventConfig, enabled: pressed })}
            className='absolute left-0'
          ><div/></Switch>
          Canvas Event
        </UnderlinedTitle>
      ),
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-center items-center`)}>
          {Object.keys(controls).length > 0 && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={controls} schema={flowExtractor.getCanvasEventSchema()} onSubmit={(newCanvasEventConfig: any) => flowExtractor.setCanvasEventConfig({...flowExtractor.canvasEventConfig, ...newCanvasEventConfig})} />
            </div>
          )}
          <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
          {Object.keys(controls).length > 0 && <TabTitle className={cn(`text-md w-full`)}>State</TabTitle>}
            {flowEvents?.canvasEvent ? <FakeForm object={flowEvents?.canvasEvent} /> : <div className="text-primary/80 px-2 py-4">No Canvas Event</div>}
          </div>
        </div>
      ),
      open: true,
    }
  }, [flowEvents?.canvasEvent, flowExtractor]);

  return (
    <FlowTab title="Events">
      <Accordion className={cn(`overflow-hidden`)} spaceBetween={16} items={[UIStateAccordion(), HistoryRecordsAccordion(), CanvasEventAccordion()]} />
    </FlowTab>
  )
};
FlowEventsTab.displayName = 'FlowEventsTab';
