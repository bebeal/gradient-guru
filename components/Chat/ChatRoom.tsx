'use client'

import { ChatRoomProvider } from "@/hooks";
import { Chat } from "@/components";

export interface ChatRoomProps {

}

export const ChatRoom: React.FC<ChatRoomProps> = (props: ChatRoomProps) => {
  return (
    <ChatRoomProvider>
      <Chat {...props} />
    </ChatRoomProvider>
  );
};
