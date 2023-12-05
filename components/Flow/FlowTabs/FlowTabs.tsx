
import { useMemo } from 'react';
import { EventsTab, IconSetCache, ModelTab, NodesTab, SidePanel, StateTab } from '@/components';

export interface FlowTabsProps {
  className?: string;
}
export const FlowTabs = (props: FlowTabsProps) => {
  const { className = '' } = props;

  const FlowEventsTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.Network3 height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'Events',
      content: <EventsTab />,
    };
  }, []);

  const FlowNodesTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.ChartNetwork height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'Nodes',
      content: <NodesTab />,
    };
  }, []);

  const FlowStateTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.VisualRecognition height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'State',
      content: <StateTab />,
    };
  }, []);

  const FlowModelTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.IbmWatsonStudio height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'Query Builder',
      content: <ModelTab />,
    };
  }, []);

  const tabs = useMemo(() => [FlowEventsTab, FlowNodesTab, FlowStateTab, FlowModelTab], [FlowEventsTab, FlowNodesTab, FlowStateTab, FlowModelTab]);

  return <SidePanel className={className} tabs={tabs} />;
};
FlowTabs.displayName = 'FlowTabs';
