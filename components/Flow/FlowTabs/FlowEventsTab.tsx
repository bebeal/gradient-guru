'use client'

import { Accordion, BulletedList, FakeForm, FlowTimelineScrubber, FlowTab, Switch, Subtitle, UnderlinedTitle } from '@/components';
import * as yup from 'yup';
import { FlowEventsRecorderContext, FlowEventsRecorderContextType, useFlowEventsRecorder, useFlowExtractor, useMounted } from '@/hooks';
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
      <div className="flex flex-col gap-1 w-full h-auto justify-center items-center">
        <UnderlinedTitle>Ui Event:</UnderlinedTitle>
        {flowEvents?.uiEvents?.length > 0 ? <FakeForm object={flowEvents?.uiEvents[0]} /> : <div className="text-primary/80 px-2 py-4">No UI Event</div>}
        <UnderlinedTitle>Canvas Event</UnderlinedTitle>
        {flowEvents?.canvasEvent ? <FakeForm object={flowEvents?.canvasEvent} /> : <div className="text-primary/80 px-2 py-4">No Canvas Event</div>}
        <UnderlinedTitle>History Records</UnderlinedTitle>
        {flowEvents?.historyRecords.length > 0 ? <BulletedList items={flowEvents?.getHistoryRecords()} /> : <div className="text-primary/80 px-2 py-4">No Records</div>}
        <UnderlinedTitle>History Scrubber</UnderlinedTitle>
        <FlowTimelineScrubber events={flowEvents.historyRecords} />
      </div>

    </FlowTab>
  )
};
FlowEventsTab.displayName = 'FlowEventsTab';
