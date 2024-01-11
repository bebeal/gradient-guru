'use client'

import { ChatRoomProvider } from "@/hooks";
import { Chat, ChatRoomMessage } from "@/components";

export interface ChatRoomProps {
  messages?: ChatRoomMessage[];
}

export const ChatRoom: React.FC<ChatRoomProps> = (props: ChatRoomProps) => {
  return (
    <ChatRoomProvider {...props}>
      <Chat />
    </ChatRoomProvider>
  );
};
