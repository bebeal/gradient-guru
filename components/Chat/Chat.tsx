'use client'

import { ChatList, ChatTextArea, ChatRoomInfo } from "@/components";
import { useChatRoom } from "@/hooks";
import { cn } from "@/utils";

export interface ChatProps {
}

export const Chat = () => {
  const {
    messages,
    themeKey,
  } = useChatRoom();

  return (
    <div className={cn('w-full h-full relative flex flex-col rounded')}>
      <ChatRoomInfo />
      <ChatList messages={messages} themeKey={themeKey} />
      <ChatTextArea />
    </div>
  );
};
