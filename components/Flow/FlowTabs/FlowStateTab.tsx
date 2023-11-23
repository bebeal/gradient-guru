'use client'

import { FlowStateContextType, useFlowState } from '@/hooks';
import React from 'react';
import { FlowTab } from './shared';

export type FlowStateTabProps = {
};
export const FlowStateTab = (props: FlowStateTabProps) => {
  const {
    ...rest
  } = props;
  const flowState: FlowStateContextType = useFlowState();

  return (
    <FlowTab title="Flow State">
      {JSON.stringify(flowState, null, 2)}
    </FlowTab>
  )
};
FlowStateTab.displayName = 'FlowStateTab';