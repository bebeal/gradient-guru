'use client'

import { Chat, ChatRoomMessage } from "@/components"
import { ChatRoomProvider } from "@/hooks"

export interface FlowChatProps {

}

export const FlowChat: React.FC<FlowChatProps> = () => {

  const onNewMessage = (message: ChatRoomMessage) => {
    return;
  };

  return (
    <ChatRoomProvider onNewMessage={onNewMessage}>
      <div className="flex flex-col w-full h-full">
        <Chat />
      </div>
    </ChatRoomProvider>
  )
}
