'use client'

import { ChatListTheme, ChatListThemes, ChatMessage, ChatRoomMessage, Separator } from "@/components";
import { cn } from "@/utils";

export interface ChatListProps {
  messages?: ChatRoomMessage[];
  themeKey?: ChatListTheme;
}
export const ChatList = (props: ChatListProps) => {
  const {
    messages = [],
    themeKey='chatgpt',
  } = props;
  const theme = ChatListThemes[themeKey];

  return (
    <div className={cn("flex flex-col h-full flex-grow overflow-auto justify-self-start", theme.secondary)}>
      {messages.map((chatRoomMessage: any, index: number) => {
        const messageTheme = index % 2 === 0 ? theme.primary : theme.secondary;
        return (
          <div key={index} className="h-auto flex flex-col">
          <ChatMessage chatRoomMessage={chatRoomMessage} className={messageTheme} />
          <Separator className="bg-primary/80 w-full" />
        </div>
        );
      })}
    </div>
  )
};

