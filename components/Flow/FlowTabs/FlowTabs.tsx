
import { useMemo } from 'react';
import { FlowEventsTab, FlowNodesTab, FlowQueryBuilderTab, FlowStateTab, IconSetCache, SidePanel } from '@/components';

export interface FlowTabsProps {
  className?: string;
}
export const FlowTabs = (props: FlowTabsProps) => {
  const { className = '' } = props;

  const EventsTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.Network3 height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'Events',
      content: <FlowEventsTab />,
    };
  }, []);

  const NodesTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.ChartNetwork height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'Nodes',
      content: <FlowNodesTab />,
    };
  }, []);

  const StateTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.VisualRecognition height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'State',
      content: <FlowStateTab />,
    };
  }, []);

  const QueryBuilderTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.IbmWatsonStudio height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'Query Builder',
      content: <FlowQueryBuilderTab />,
    };
  }, []);

  const tabs = useMemo(() => [EventsTab, NodesTab, StateTab, QueryBuilderTab], [EventsTab, NodesTab, StateTab, QueryBuilderTab]);

  return <SidePanel className={className} tabs={tabs} />;
};
FlowTabs.displayName = 'FlowTabs';
