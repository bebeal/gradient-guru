'use client'

import { ChatMessage, Separator } from "@/components";
import { UserMessage } from "@/hooks";

export interface ChatListProps {
  messages?: UserMessage[];
}

export const ChatList = (props: ChatListProps) => {
  const {
    messages=[]
  } = props;

  return (
    <div className="flex flex-col">
      {messages.map((chatMessags: any, index: number) => (
        <div key={index} className="h-auto flex flex-col">
          <ChatMessage {...chatMessags} />
          {index < messages.length - 1 && (
            <Separator className="bg-primary/80" />
          )}
        </div>
      ))}
    </div>
  )
};

