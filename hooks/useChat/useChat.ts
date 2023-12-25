import { ChatProps } from "@/components";
import { useRef, useState, KeyboardEvent, ChangeEvent, useCallback } from "react";
import { nanoid } from "@/utils";
import { ChatStatusEnum, ChatUsers, SubmitKeys, UserMessage, simulateChatResponse } from "./utils";

export interface useChatProps extends ChatProps {

}

export const useChat = (props: useChatProps) => {
  const {
    id = `chat-${nanoid()}`,
    initialMessages = [],
  } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // chat state
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [messages, setMessages] = useState<UserMessage[]>(initialMessages);
  const [status, setStatus] = useState<ChatStatusEnum>(ChatStatusEnum.Idle);

  // basic state management
  const onFocus = useCallback(() => { setStatus(ChatStatusEnum.Focus); setIsFocused(true); }, []);
  const onBlur = useCallback(() => { setStatus(ChatStatusEnum.Idle); setIsFocused(false); }, []);
  const onMouseEnter = useCallback(() => { setIsHovered(true); }, []);
  const onMouseLeave = useCallback(() => { setIsHovered(false); }, []);

  // Handles the change of the user's input
  const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    setStatus(ChatStatusEnum.Append);
  };

  // Determines if the user can submit a message
  const canSubmit = useCallback(() => {
    return input.length > 0 && !isLoading;
  }, [input, isLoading]);

  // Updates the chat entries with a new message to render
  const updateEntries = useCallback((userMessage: UserMessage) => {
    setMessages((prevMessages) => {
      return [...prevMessages, userMessage];
    });
  }, []);

  // Handles the submission of a user's message. It updates the chat entries and makes a request to the model for a response
  const handleSubmit = useCallback(async (event?: any) => {
    // handle event
    event?.preventDefault();
    event?.stopPropagation();
    // handle request to model
    if (!canSubmit()) {
      console.log(`Issue Submitting.\nCan only submit if \n\t* input.length > 0: ${input.length > 0} \n\t* !isLoading: ${!isLoading}`);
      return;
    }
    setStatus(ChatStatusEnum.Loading);
    setIsLoading(true);
    updateEntries({
      user: ChatUsers('user'),
      message: {
        content: input,
        timestamp: Date.now().valueOf(),
      }
    });
    setInput("");
    // handle response from model
    const chatResponse: UserMessage = await simulateChatResponse(input);
    if (chatResponse) {
      updateEntries(chatResponse);
      setStatus(ChatStatusEnum.Idle);
      setIsLoading(false);
    }
  }, [canSubmit, input, isLoading, updateEntries]);

  const handleKeyUp = useCallback((event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (SubmitKeys.includes(event.key) && !event.shiftKey && !event.nativeEvent.isComposing) {
      handleSubmit();
    }
  }, [handleSubmit]);

  return {
    formRef,
    inputRef,
    input,
    setInput,
    isLoading,
    setIsLoading,
    messages,
    setMessages,
    status,
    setStatus,
    isFocused,
    setIsFocused,
    isHovered,
    setIsHovered,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onInputChange,
    canSubmit,
    updateEntries,
    handleSubmit,
    handleKeyUp,
  };

};