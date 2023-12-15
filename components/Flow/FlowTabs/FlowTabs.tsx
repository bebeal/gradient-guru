'use client';

import { memo } from 'react';
import { FlowStateTab, IconSetCache, ModelTab, NodeExtractionTab, NodesTab, SidePanel } from '@/components';

export interface FlowTabsProps {
  className?: string;
}
export const FlowTabs = memo((props: FlowTabsProps) => {
  const { className = '' } = props;

  return <SidePanel className={className} tabs={[
    {
      icon: <IconSetCache.Carbon.Dashboard height={'100%'} width={'100%'} />,
      name: 'Flow State',
      content: <FlowStateTab />,
    },
    {
      icon: <IconSetCache.Carbon.DataCategorical height={'100%'} width={'100%'} />,
      name: 'Nodes',
      content: <NodesTab />,
    },
    {
      icon: <IconSetCache.Carbon.Downstream height={'100%'} width={'100%'} />,
      name: 'Node Extraction',
      content: <NodeExtractionTab />,
    },
    {
      icon: <IconSetCache.Carbon.IbmWatsonStudio height={'100%'} width={'100%'} />,
      name: 'Query Builder',
      content: <ModelTab />,
    }
  ]} />;
});
FlowTabs.displayName = 'FlowTabs';