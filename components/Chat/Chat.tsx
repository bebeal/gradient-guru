'use client'

import { UserMessage, useChat } from "@/hooks";
import { Button, ChatList, ChatStatus, IconSetCache, TextArea } from "@/components";
import { cn } from "@/utils";

export interface ChatProps {
  id?: string;
  initialMessages?: UserMessage[];
}

export const Chat = (props: ChatProps) => {
  const chat = useChat(props);

  return (
      <div className={cn('pt-4 w-full h-full relative justify-between flex flex-col')}>
        <div className="flex flex-col h-full">
          <ChatList messages={chat?.messages} />
        </div>
        <div className="flex flex-col h-auto inset-x-0 bottom-0 from-[#40414F] from-60% bg-gradient-to-b to-[#202027]/30 backdrop-blur-2xl">
          <div className="shadow-lg rounded-lg p-2 overflow-hidden">
            <TextArea
              ref={chat.inputRef}
              tabIndex={0}
              onKeyUp={chat.handleKeyUp}
              rows={1}
              value={chat.input}
              onFocus={chat.onFocus}
              onBlur={chat.onBlur}
              onChange={chat.onInputChange}
              placeholder="Send a message"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
  )
};