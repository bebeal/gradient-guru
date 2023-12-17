'use client';

import { BulletedList, FlowTab, Title, TimelineScrubber } from '@/components';
import { ContentRecorderContextType, useContentRecorder } from '@/hooks';
import { cn } from '@/utils';

export const HistoryTab = () => {
  const contentRecorder: ContentRecorderContextType = useContentRecorder();

  return (
    <FlowTab title="History">
      <div className={cn(`w-full h-full flex flex-col justify-start items-center p-1 gap-2`)}>
        <div className="flex flex-col w-full h-auto justify-center items-center overflow-auto gap-1 bg-primary border border-primary rounded p-1">
          <Title className={cn(`text-sm w-full p-1`)}>Scrubber</Title>
          <TimelineScrubber events={contentRecorder.historyRecords} />
        </div>
        <div className="flex flex-col w-full h-auto justify-center items-center overflow-auto gap-1 bg-primary border border-primary rounded p-1">
          <Title className={cn(`text-sm w-full p-1`)}>Records</Title>
          {contentRecorder?.historyRecords.length > 0 ? <BulletedList className="max-h-[125px] p-1" items={contentRecorder?.getReadableHistoryRecords()} /> : <div className="text-primary/80 px-2 py-4">No Records</div>}
        </div>
      </div>
    </FlowTab>
  );
};
HistoryTab.displayName = 'HistoryTab';
