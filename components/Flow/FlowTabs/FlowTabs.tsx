'use client';

import { StateTab, IconSetCache, ModelTab, NodesTab, SidePanel, HistoryTab, ExtractionTab } from '@/components';
import { useMemo } from 'react';

export interface FlowTabsProps {
  className?: string;
}
export const FlowTabs = (props: FlowTabsProps) => {
  const { className = '' } = props;

  const FlowNodesTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.DataCategorical height={'100%'} width={'100%'} />,
      name: 'Nodes',
      content: <NodesTab />,
    }
  }, []);

  const FlowHistoryTab = useMemo(() => {
    return {
    icon: <IconSetCache.Carbon.RecentlyViewed height={'100%'} width={'100%'} />,
    name: 'History',
    content: <HistoryTab />,
  };
}, []);

  const FlowStateTab = useMemo(() => {
    return {
    icon: <IconSetCache.Carbon.MapIdentify height={'100%'} width={'100%'} />,
    name: 'State',
    content: <StateTab />,
  };
}, []);

  const FlowExtractionTab = useMemo(() => {
    return {
    icon: <IconSetCache.Carbon.Downstream height={'100%'} width={'100%'} />,
    name: 'Extraction',
    content: <ExtractionTab />,
  };
}, []);

  const FlowModelTab = useMemo(() => {
    return {
    icon: <IconSetCache.Carbon.MachineLearningModel height={'100%'} width={'100%'} />,
    name: 'Model',
    content: <ModelTab />,
  };
}, []);

  return <SidePanel className={className} tabs={[
    FlowNodesTab,
    FlowHistoryTab,
    FlowStateTab,
    FlowExtractionTab,
    FlowModelTab
  ]} />;
};
FlowTabs.displayName = 'FlowTabs';