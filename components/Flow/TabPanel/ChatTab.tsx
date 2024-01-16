'use client';

import { FlowTab, FlowChat } from '@/components';

export const ChatTab = () => {

  return (
    <FlowTab className="h-full p-0" tabClasses="w-full h-full p-0 m-0">
      <FlowChat />
    </FlowTab>
  );
};
ChatTab.displayName = 'ChatTab';
