'use client'
import { IconSetCache, SidePanel } from "@/components";

const SidePanelTestPage = () => {
  const tabs = [
    {
      icon: <IconSetCache.Carbon.DataBase height={'100%'} width={'100%'} stroke={'transparent'} />,
      name: 'Flow State',
      content: <div className="w-full h-full flex flex-col p-2 overflow-auto gap-2 rounded-lg">test tab</div>
    },
  ];

  return (
    <div className="flex flex-row w-full h-full">
      <SidePanel tabs={tabs} />
      <div className="flex flex-col w-full h-full bg-gray-500 p-2">test main page</div>
    </div>
  )
};
export default SidePanelTestPage;
