'use client'

import { useRef, useState, ChangeEvent, useCallback, KeyboardEventHandler } from "react";
import { SubmitChatInputKeys, TextArea, makeNewChatRoomMessage } from "@/components";
import { useChatRoom } from "@/hooks";

export const ChatTextArea = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { addMessage } = useChatRoom();

  const handleKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = useCallback((event) => {
    const key = event.key.toLowerCase();
    if (SubmitChatInputKeys.includes(key)) {
      event.preventDefault();
      const chatRoomMessage = makeNewChatRoomMessage('user', input);
      addMessage(chatRoomMessage);
      setInput("");
    }
  }, [addMessage, input]);

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
    <div className="flex flex-col h-auto inset-x-0 bottom-0 from-[#40414F] from-60% bg-gradient-to-b to-[#202027]/30 backdrop-blur-2xl">
        <div className="shadow-lg rounded-lg p-2 overflow-hidden">
          <TextArea
            ref={ref}
            tabIndex={0}
            onKeyUp={handleKeyUp}
            rows={1}
            value={input}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onInputChange}
            placeholder="Send a message"
            spellCheck={false}
          />
        </div>
      </div>
  )
}
