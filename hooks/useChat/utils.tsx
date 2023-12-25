'use client'

import API from 'openai';
import { ReactElement } from "react";
import { IconSetCache } from "@/components";
import { mockInput } from "@/clients";

export type User = {
  id: string;
  name?: string;
  icon?: string | ReactElement;
  theme?: string;
  color?: string;
  type?: API.ChatCompletionRole;
};

export type Message = {
  content: string;
  timestamp?: Date | number;
};
  
export type UserMessage = {
  user: User;
  message: Message;
};

export const SubmitKeys: string[] = [
  'Enter', 
  'NumpadEnter'
];

export enum ChatStatusEnum {
  Append = 'append',
  Loading = 'loading',
  Idle = 'idle',
  Error = 'error',
  Focus = 'focus',
  Disabled = 'disabled',
  Share = 'share',
}

export const initializeChatUsers = ():  Record<string, User> => {
  return {
    'gpt-3.5-turbo': {
      type: 'assistant',
      name: 'gpt-3.5-turbo',
      icon: (<IconSetCache.Logos.OpenAI />),
      theme: 'secondary',
      color: 'green',
      id: 'gpt-3.5-turbo',
    },
    'gpt-4': {
      type: 'assistant',
      name: 'gpt-4',
      icon: (<IconSetCache.Logos.OpenAI />),
      theme: 'secondary',
      color: 'violet',
      id: 'gpt-4',
    },
    'identity': {
      type: 'assistant',
      name: 'identity',
      icon: (<IconSetCache.Carbon.Replicate />),
      theme: 'secondary',
      color: 'violet',
      id: 'identity',
    },
    'user': {
      type: 'user',
      name: 'noah',
      icon: 'N',
      theme: 'primary',
      color: 'blue',
      id: 'user',
    },
  };
}

export const ChatUsers = (user: string): User => {
  const AllChatUsers = initializeChatUsers();
  return AllChatUsers[user];
};


export const simulateChatResponse = async (input: string): Promise<UserMessage> => {
  const modelResponse: API.ChatCompletion = mockInput as API.ChatCompletion;
  return {
    user: ChatUsers(modelResponse.model),
    message: {
      content: modelResponse?.choices?.[0]?.message?.content || '',
      timestamp: modelResponse.created,
    },
  };
};
