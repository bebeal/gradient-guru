'use client';

import { IconSetCache, ModelTab, NodesTab, SidePanel, HistoryTab, ExtractionTab, Loading } from '@/components';
import { useMounted } from '@/hooks';
import { useMemo } from 'react';

export interface FlowSidePanelProps {
  className?: string;
}
export const FlowSidePanel = (props: FlowSidePanelProps) => {
  const { className = '' } = props;
  const mounted = useMounted();

  const FlowNodesTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.DataCategorical height={'100%'} width={'100%'} />,
      name: 'Nodes',
      content: mounted ? <NodesTab /> : <Loading />,
    }
  }, [mounted]);

  const FlowHistoryTab = useMemo(() => {
    return {
    icon: <IconSetCache.Carbon.RecentlyViewed height={'100%'} width={'100%'} />,
    name: 'History',
    content: mounted ? <HistoryTab /> : <Loading />,
  };
}, [mounted]);
  const FlowExtractionTab = useMemo(() => {
    return {
    icon: <IconSetCache.Carbon.Downstream height={'100%'} width={'100%'} />,
    name: 'Extraction',
    content: mounted ? <ExtractionTab /> : <Loading />,
  };
}, [mounted]);

  const FlowModelTab = useMemo(() => {
    return {
    icon: <IconSetCache.Carbon.MachineLearningModel height={'100%'} width={'100%'} />,
    name: 'Model',
    content: mounted ? <ModelTab /> : <Loading />,
  };
}, [mounted]);

  return <SidePanel className={className} tabs={[
    FlowNodesTab,
    FlowHistoryTab,
    FlowExtractionTab,
    FlowModelTab
  ]} />;
};
FlowSidePanel.displayName = 'FlowSidePanel';