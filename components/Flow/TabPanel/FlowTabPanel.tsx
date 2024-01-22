'use client';

import { ChatTab, ExtractionTab, HistoryTab, IconSetCache, Loading, ModelTab, NodesTab, SidePanel } from '@/components';
import { useMounted } from '@/hooks';
import { useMemo } from 'react';

export interface FlowTabPanelProps {
  className?: string;
}
export const FlowTabPanel = (props: FlowTabPanelProps) => {
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

  const FlowChatTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.MachineLearning height={'100%'} width={'100%'} />,
      name: 'Chat',
      content: mounted ? <ChatTab /> : <Loading />,
    };
  }, [mounted]);

  return <SidePanel className={className} tabs={[
    FlowNodesTab,
    FlowHistoryTab,
    FlowExtractionTab,
    FlowModelTab,
    FlowChatTab
  ]} />;
};
FlowTabPanel.displayName = 'FlowSidePanel';