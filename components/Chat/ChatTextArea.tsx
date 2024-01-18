'use client'

import { useRef, useState, ChangeEvent, useCallback, KeyboardEventHandler } from "react";
import { IconSetCache, Separator, SubmitChatInputKeys, TextArea, makeNewChatRoomMessage } from "@/components";
import { useChatRoom } from "@/hooks";
import { AnimatedLineSVG, cn } from "@/utils";

export interface ChatTextAreaProps {
  className?: string;
}

export const ChatTextArea = (props: ChatTextAreaProps) => {
  const {
     className
  } = props;
  const ref = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addMessages } = useChatRoom();

  const onSubmit: KeyboardEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    const key = event.key;
    if (!event.shiftKey && SubmitChatInputKeys.includes(key)) {
      event.preventDefault();
      event.stopPropagation();
      const chatRoomMessage = makeNewChatRoomMessage('user', input);
      addMessages(chatRoomMessage);
      setInput("");
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 7000);
    }
  }, [addMessages, input]);

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const onInputChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  }, []);

  return (
      <div className={cn("relative flex flex-col h-auto p-2 from-[#000000] from-60% bg-gradient-to-b to-[#000000]/30 backdrop-blur-2xl", className)}>
        <Separator className="bg-primary/80 w-full absolute left-0 top-0 h-px" />
        <div className="relative flex flex-row h-auto">
          <div className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-full">
            <IconSetCache.Carbon.DocumentAttachment width="60%" />
          </div>
          <TextArea
            ref={ref}
            tabIndex={0}
            onKeyDown={onSubmit}
            rows={1}
            value={input}
            onChange={onInputChange}
            placeholder="Send a message"
            spellCheck={false}
            id="prompt-textarea"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-full">
          {isLoading ? <AnimatedLineSVG width="60%"><IconSetCache.Carbon.Send width="60%" /></AnimatedLineSVG> : <IconSetCache.Carbon.Send width="60%"/>}
          </div>
        </div>
    </div>
  );
}

