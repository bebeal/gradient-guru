'use client'

import { ChatList, ChatTextArea, ChatRoomInfo } from "@/components";
import { cn } from "@/utils";

export interface ChatProps {
}

export const Chat = () => {
  return (
    <div className={cn('pt-4 w-full h-full relative justify-between flex flex-col')}>
      <ChatRoomInfo />
      <ChatList />
      <ChatTextArea />
    </div>
  )
};