'use client'

import { Accordion, BulletedList, FakeForm } from '@/components';
import { FlowStateContextType, useFlowState } from '@/hooks';
import { FlowTab } from './shared';

export type FlowStateTabProps = {
};
export const FlowStateTab = (props: FlowStateTabProps) => {
  const {
    ...rest
  } = props;
  const flowState: FlowStateContextType = useFlowState();

  return (
    <FlowTab title="State">
      <Accordion
        className="text-xs text-primary font-bold"
        spaceBetween={16}
        triggerClassName="px-2 py-1 text-xs text-primary font-bold"
        items={[
          {
            name: 'Canvas State',
            content: <FakeForm object={flowState.canvasEvent} />,
            selected: false,
            open: true,
          },
          {
            name: 'UI State',
            content: flowState?.uiEvents.length > 0 ? <FakeForm object={flowState.uiEvents[0]} /> : <div className="text-primary/80 px-2 py-4">No UI State</div>,
            selected: false,
            open: true,
          },
          {
            name: 'Events History',
            content: flowState?.storeEvents.length > 0 ? <BulletedList items={flowState?.storeEvents} /> : <div className="text-primary/80 px-2 py-4">No Events</div>,
            selected: false,
            open: true,
          },
        ]} 
      />
    </FlowTab>
  )
};
FlowStateTab.displayName = 'FlowStateTab';
