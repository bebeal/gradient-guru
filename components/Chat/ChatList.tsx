'use client'

import { ChatMessage, Separator } from "@/components";
import { useChatRoom } from "@/hooks";

export const ChatList = () => {
  const {
    messages
  } = useChatRoom();

  return (
    <div className="flex flex-col h-auto">
      {messages.map((chatMessags: any, index: number) => (
        <div key={index} className="h-auto flex flex-col">
          <ChatMessage {...chatMessags} />
          {index < messages.length - 1 && (
            <Separator className="bg-primary/80 w-full" />
          )}
        </div>
      ))}
    </div>
  )
};

