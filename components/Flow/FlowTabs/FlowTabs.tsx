'use client'

import { FlowStateTab, IconSetCache, SidePanel } from "@/components";
import { FlowNodesTab } from "./FlowNodesTab";

export interface FlowTabsProps {
};
export const FlowTabs = (props: FlowTabsProps) => {
  const {
  } = props;

  const tabs = [
    {
      icon: <IconSetCache.Carbon.DataBase height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'Flow State',
      content: <FlowStateTab />
    },
    {
      icon: <IconSetCache.Carbon.ChartNetwork height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'Flow Nodes',
      content: <FlowNodesTab />
    },
  ];

  return (
    <SidePanel tabs={tabs} />
  )
};
FlowTabs.displayName = 'FlowTabs';