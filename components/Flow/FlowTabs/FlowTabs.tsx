'use client'

import { IconSetCache, SidePanel, FlowStateTab, FlowNodesTab, FlowQueryBuilderTab } from "@/components";
import { useMemo } from "react";

export interface FlowTabsProps {
  className?: string;
};
export const FlowTabs = (props: FlowTabsProps) => {
  const {
    className='',
  } = props;

  const StateTab = useMemo(() => {
    return     {
      icon: <IconSetCache.Carbon.DataBase height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'State',
      content: <FlowStateTab />
    };
  }, []);

  const NodesTab = useMemo(() => {
    return {
      icon: <IconSetCache.Carbon.ChartNetwork height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'Nodes',
      content: <FlowNodesTab />
    };
  }, []);

  const QueryBuilderTab = useMemo(() => {
    return     {
      icon: <IconSetCache.Carbon.ModelBuilder height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'Query Builder',
      content: <FlowQueryBuilderTab />
    };
  }, []);

  const tabs = [
    StateTab,
    NodesTab,
    QueryBuilderTab,
  ];

  return (
    <SidePanel className={className} tabs={tabs} />
  )
};
FlowTabs.displayName = 'FlowTabs';
