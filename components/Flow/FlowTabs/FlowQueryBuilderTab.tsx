'use client'

import { Accordion, BulletedList, FakeForm } from '@/components';
import { FlowStateContextType, useFlowState } from '@/hooks';
import { FlowTab } from './shared';

export type FlowQueryBuilderTabProps = {
};
export const FlowQueryBuilderTab = (props: FlowQueryBuilderTabProps) => {
  const {
    ...rest
  } = props;

  return (
    <FlowTab title="Query Builder">
    </FlowTab>
  )
};
FlowQueryBuilderTab.displayName = 'FlowQueryBuilderTab';
