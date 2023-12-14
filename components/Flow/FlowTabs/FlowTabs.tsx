'use client'

import { memo, useMemo } from 'react';
import { EventsTab, IconSetCache, ModelTab, NodesTab, SidePanel, StateTab } from '@/components';

export interface FlowTabsProps {
  className?: string;
}
export const FlowTabs = memo((props: FlowTabsProps) => {
  const { className = '' } = props;

  const FlowEventsTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.Network3 height={'100%'} width={'100%'} />,
      name: 'Events',
      content: <EventsTab />,
    };
  }, []);

  const FlowNodesTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.ChartNetwork height={'100%'} width={'100%'} />,
      name: 'Nodes',
      content: <NodesTab />,
    };
  }, []);

  const FlowStateTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.VisualRecognition height={'100%'} width={'100%'} />,
      name: 'State',
      content: <StateTab />,
    };
  }, []);

  const FlowModelTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.IbmWatsonStudio height={'100%'} width={'100%'} />,
      name: 'Query Builder',
      content: <ModelTab />,
    };
  }, []);

  return <SidePanel className={className} tabs={[FlowEventsTab, FlowNodesTab, FlowStateTab, FlowModelTab]} />;
});
FlowTabs.displayName = 'FlowTabs';
