'use client';

import { BulletedList, FlowTab, Title, TimelineScrubber, FlipCard } from '@/components';
import { useContentRecorder } from '@/hooks';
import { cn } from '@/utils';

export const HistoryTab = () => {
  const { historyRecords, readableRecords } = useContentRecorder();

  return (
    <FlowTab title="History">
      <div className={cn(`flex flex-col justify-center gap-4 w-full`)}>
        <FlipCard
          title={<Title className={cn(`text-sm w-full`)}>Scrubber</Title>}
          front={{
            children: <TimelineScrubber events={historyRecords} />
          }}
        />
        <FlipCard
          title={<Title className={cn(`text-sm w-full`)}>Records</Title>}
          front={{
            children: readableRecords.length > 0 ? <BulletedList className="max-h-[125px] p-1 text-xs" items={readableRecords} /> : <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No Records</div>
          }}
        />
      </div>
    </FlowTab>
  );
};
HistoryTab.displayName = 'HistoryTab';
