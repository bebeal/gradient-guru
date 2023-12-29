'use client'

import { ChangeEvent, ReactElement, useCallback, useRef, useState } from 'react';
import OpenAi from 'openai';
import { mockInput } from '@/clients/Models';
import { ChatProps, IconSetCache } from '@/components';
import { nanoid } from '@/utils';

export type User = {
  id: string;
  name?: string;
  icon?: string | ReactElement;
  theme?: string;
  color?: string;
  type?: OpenAi.ChatCompletionRole;
};

export type Message = {
  content: string;
  timestamp?: Date | number;
};

export type UserMessage = {
  user: User;
  message: Message;
};

export const SubmitKeys: string[] = ['Enter', 'NumpadEnter'];

export enum ChatStatusEnum {
  Append = 'append',
  Loading = 'loading',
  Idle = 'idle',
  Error = 'error',
  Focus = 'focus',
  Disabled = 'disabled',
  Share = 'share',
}

export const initializeChatUsers = (): Record<string, User> => {
  return {
    'gpt-3.5-turbo': {
      type: 'assistant',
      name: 'gpt-3.5-turbo',
      icon: <IconSetCache.Logos.OpenAI />,
      theme: 'secondary',
      color: 'green',
      id: 'gpt-3.5-turbo',
    },
    'gpt-4': {
      type: 'assistant',
      name: 'gpt-4',
      icon: <IconSetCache.Logos.OpenAI />,
      theme: 'secondary',
      color: 'violet',
      id: 'gpt-4',
    },
    identity: {
      type: 'assistant',
      name: 'identity',
      icon: <IconSetCache.Carbon.Replicate />,
      theme: 'secondary',
      color: 'violet',
      id: 'identity',
    },
    user: {
      type: 'user',
      name: 'noah',
      icon: 'N',
      theme: 'primary',
      color: 'blue',
      id: 'user',
    },
  };
};

export const ChatUsers = (user: string): User => {
  const AllChatUsers = initializeChatUsers();
  return AllChatUsers[user];
};

export const simulateChatResponse = async (input: string): Promise<UserMessage> => {
  const modelResponse: OpenAi.ChatCompletion = mockInput as OpenAi.ChatCompletion;
  return {
    user: ChatUsers(modelResponse.model),
    message: {
      content: modelResponse?.choices?.[0]?.message?.content || '',
      timestamp: modelResponse.created,
    },
  };
};

export interface useChatProps extends ChatProps {}

export const useChat = (props: useChatProps) => {
  const { id = `chat-${nanoid()}`, initialMessages = [] } = props;
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
  const onFocus = useCallback(() => {
    setStatus(ChatStatusEnum.Focus);
    setIsFocused(true);
  }, []);
  const onBlur = useCallback(() => {
    setStatus(ChatStatusEnum.Idle);
    setIsFocused(false);
  }, []);
  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

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
  const handleSubmit = useCallback(
    async (event?: any) => {
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
        },
      });
      setInput('');
      // handle response from model
      const chatResponse: UserMessage = await simulateChatResponse(input);
      if (chatResponse) {
        updateEntries(chatResponse);
        setStatus(ChatStatusEnum.Idle);
        setIsLoading(false);
      }
    },
    [canSubmit, input, isLoading, updateEntries]
  );

  const handleKeyUp = useCallback(
    (event: any): void => {
      if (SubmitKeys.includes(event.key) && !event.shiftKey && !event.nativeEvent.isComposing) {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

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
