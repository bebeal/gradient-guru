'use client'

import { Accordion, BulletedList, FakeForm, FlowTimelineScrubber, FlowTab } from '@/components';
import { FlowEventsRecorderContext, FlowEventsRecorderContextType, useFlowEventsRecorder, useMounted } from '@/hooks';
import { useCallback } from 'react';

export type FlowEventsTabProps = {
};
export const FlowEventsTab = (props: FlowEventsTabProps) => {
  const {
    ...rest
  } = props;
  const flowEvents: FlowEventsRecorderContextType = useFlowEventsRecorder();

  return (
    <FlowTab title="Events">
      <div className="flex flex-col gap-1 w-full h-auto overflow-auto justify-center items-center">
        <div className="flex text-primary/80 text-xs font-bold underline justify-center text-center items-center">UI Event:</div>
        {flowEvents?.uiEvents?.length > 0 ? <FakeForm object={flowEvents?.uiEvents[0]} /> : <div className="text-primary/80 px-2 py-4">No UI Event</div>}
        <div className="flex text-primary/80 text-xs font-bold underline justify-center text-center items-center">Canvas Event:</div>
        {flowEvents?.canvasEvent ? <FakeForm object={flowEvents?.canvasEvent} /> : <div className="text-primary/80 px-2 py-4">No Canvas Event</div>}
        <div className="flex text-primary/80 text-xs font-bold underline justify-center text-center items-center">History Records:</div>
        {flowEvents?.storeEvents.length > 0 ? <BulletedList items={flowEvents?.getStoreEvents()} /> : <div className="text-primary/80 px-2 py-4">No Records</div>}
        <div className="flex text-primary/80 text-xs font-bold underline justify-center text-center items-center">History Scrubber:</div>
        <FlowTimelineScrubber events={flowEvents.storeEvents} />
      </div>

    </FlowTab>
  )
};
FlowEventsTab.displayName = 'FlowEventsTab';
