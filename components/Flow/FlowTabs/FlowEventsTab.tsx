import { useCallback } from 'react';
import { Accordion, BulletedList, FakeForm, FlowTab, Switch, UnderlinedTitle } from '@/components';
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

  const UIEventAccordion = useCallback(() => {
    return {
      name: (
        <UnderlinedTitle className={cn(`flex w-full relative h-full py-1 pointer-events-auto z-[1000]`)}>
          <Switch
            asChild
            pressed={flowExtractor.uiEventConfig.enabled}
            onPressedChange={(pressed: boolean) => flowExtractor.setUiEventConfig({ ...flowExtractor.uiEventConfig, enabled: pressed })}
            className='absolute left-0'
          ><div/></Switch>
          UI Event
        </UnderlinedTitle>
      ),
      content: (
        <div className={cn(`w-full h-full flex justify-center items-center`)}>
          {flowEvents?.uiEvents?.length > 0 ? <FakeForm object={flowEvents?.uiEvents[0]} /> : <div className="text-primary/80 px-2 py-4">No UI Event</div>}
        </div>
      ),
      open: true,
    }
  }, [flowEvents?.uiEvents, flowExtractor]);

  const HistoryRecordsAccordion = useCallback(() => {
    return {
      name: (
        <UnderlinedTitle className={cn(`flex w-full relative h-full py-1 pointer-events-auto z-[1000]`)}>
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
        <div className={cn(`w-full h-full flex justify-center items-center`)}>
          {flowEvents?.historyRecords.length > 0 ? <BulletedList items={flowEvents?.getHistoryRecords()} /> : <div className="text-primary/80 px-2 py-4">No Records</div>}
        </div>
      ),
      open: true,
    }
  }, [flowEvents, flowExtractor]);

  const CanvasEventAccordion = useCallback(() => {
    return {
      name: (
        <UnderlinedTitle className={cn(`flex w-full relative h-full py-1 pointer-events-auto z-[1000]`)}>
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
        <div className={cn(`w-full h-full flex justify-center items-center`)}>
          {flowEvents?.canvasEvent ? <FakeForm object={flowEvents?.canvasEvent} /> : <div className="text-primary/80 px-2 py-4">No Canvas Event</div>}
        </div>
      ),
      open: true,
    }
  }, [flowEvents?.canvasEvent, flowExtractor]);

  return (
    <FlowTab title="Events">
      <Accordion spaceBetween={4} items={[UIEventAccordion(), HistoryRecordsAccordion(), CanvasEventAccordion()]} />
    </FlowTab>
  )
};
FlowEventsTab.displayName = 'FlowEventsTab';
