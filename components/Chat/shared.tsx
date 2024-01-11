'use client';

import { ReactElement } from 'react';
import OpenAi from 'openai';
import { IconSetCache } from '@/components';
import { nanoid } from '@/utils';

export const SubmitChatInputKeys: string[] = ['Enter', 'NumpadEnter'];

export type ChatRoomUser = {
  id: string;
  name?: string;
  icon?: string | ReactElement;
  theme?: string;
  color?: string;
  role?: OpenAi.ChatCompletionRole;
};

export type ChatRoomUserMessage = {
  id: string;
  timestamp?: Date | number;
  tokensCount?: number;
  content: any | string | ReactElement;
};

export type ChatRoomMessage = {
  userId: ChatRoomUser['id'];
  message: ChatRoomUserMessage;
};

export const chatListThemes = ['chatgpt', 'base'] as const;
export type ChatListTheme = (typeof chatListThemes)[number];
export const ChatListThemes: Record<ChatListTheme, any> = {
  chatgpt: {
    primary: 'bg-[#343541] text-primary',
    secondary: 'bg-[#40414F] text-primary',
  },
  base: {
    primary: 'bg-primary text-primary',
    secondary: 'bg-secondary text-primary',
  },
};

export const chatBotStatuses = ['loading', 'idle', 'error', 'disabled'] as const;
export type ChatBotStatus = (typeof chatBotStatuses)[number];

export const simulateChatResponse = async (input: string): Promise<ChatRoomMessage> => {
  const modelResponse: OpenAi.ChatCompletion = {} as OpenAi.ChatCompletion;
  return {
    userId: modelResponse.model as ChatRoomUser['id'],
    message: {
      content: modelResponse?.choices?.[0]?.message?.content || '',
      timestamp: modelResponse.created,
    } as ChatRoomUserMessage,
  } as ChatRoomMessage;
};

export const makeNewChatRoomMessage = (userId: ChatRoomUser['id'], content: any): ChatRoomMessage => {
  return {
    userId,
    message: {
      content,
      id: nanoid(),
      timestamp: new Date(),
    },
  };
};

export const ChatBotUsers: Record<string, ChatRoomUser> = {
  'gpt-3.5-turbo': {
    role: 'assistant',
    name: 'gpt-3.5-turbo',
    icon: <IconSetCache.Logos.OpenAI className="bg-green" />,
    color: 'green',
    id: 'gpt-3.5-turbo',
  },
  'gpt-4': {
    role: 'assistant',
    name: 'gpt-4',
    icon: <IconSetCache.Logos.OpenAI className="bg-violet" />,
    color: 'violet',
    id: 'gpt-4',
  },
  'identity': {
    role: 'assistant',
    name: 'identity',
    icon: <IconSetCache.Carbon.Replicate className="bg-violet" />,
    color: 'violet',
    id: 'identity',
  },
  'unknown': {
    role: 'user',
    name: '?',
    icon: <IconSetCache.Custom.MissingNo className="bg-gray" />,
    color: 'gray',
    id: '?',
  },
  'noah': {
    role: 'user',
    name: 'Noah',
    icon: 'N',
    color: 'blue',
    id: 'user',
  },
};
