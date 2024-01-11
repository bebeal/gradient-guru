'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { ChatBotUsers, ChatListTheme, ChatRoomMessage, ChatRoomUser } from '@/components';
import { nanoid } from '@/utils';

export type ChatRoomStoreState = {
  users: ChatRoomUser['id'][];
  setUsers: (newUsers: ChatRoomUser['id'][]) => void;
  removeUser: (userId: ChatRoomUser['id']) => void;
  addUsers: (newUsers: ChatRoomUser['id'][] | ChatRoomUser['id'], onNewUserCallback?: (user: ChatRoomUser['id']) => void) => void;
  messages: ChatRoomMessage[];
  setMessages: (newMessages: ChatRoomMessage[]) => void;
  addMessages: (newMessages: ChatRoomMessage[] | ChatRoomMessage, onNewMessageCallback?: (message: ChatRoomMessage) => void) => void;
};

// Factory function to create a store for a single instance of a chat room
export const useChatRoomStore = create<ChatRoomStoreState>((set) => ({
  users: [],
  setUsers: (newUsers) => set({ users: newUsers }),
  removeUser: (userId) => set((state) => ({ users: state.users.filter((user) => user !== userId) })),
  addUsers: (newUsera, onNewUserCallback) => set((state) => {
    const users = Array.isArray(newUsera) ? newUsera : [newUsera];
    onNewUserCallback && users.forEach(onNewUserCallback);
    return { users: [...state.users, ...users] };
  }),
  messages: [],
  setMessages: (newMessages) => set({ messages: newMessages }),
  addMessages: (newMessages, onNewMessageCallback) => set((state) => {
    const messages = Array.isArray(newMessages) ? newMessages : [newMessages];
    onNewMessageCallback && messages.forEach(onNewMessageCallback);
    return { messages: [...state.messages, ...messages] };
  }),
}));

export type ChatRoomOps = {
  id: string;
  fetchUser: (userId: ChatRoomUser['id']) => ChatRoomUser;
  themeKey: ChatListTheme;
  toJSON: () => string;
  copyAsJSON: () => void;
}

export type ChatRoomState = ChatRoomStoreState & ChatRoomOps;


// top level chat room provider for which all children will pull from. encapsulates the chat room store
export const ChatRoomContext = createContext<ChatRoomState>({} as ChatRoomState);
export const ChatRoomProvider = ({ children, messages: initialMessages, onNewMessage, onNewUser }: { children: ReactNode, messages?: ChatRoomMessage[], onNewMessage?: (message: ChatRoomMessage) => void, onNewUser?: (user: ChatRoomUser['id']) => void }) => {
  const userDB = ChatBotUsers;
  const [users, setUsers, addUsersToStore, removeUser] = useChatRoomStore(useShallow((state) => [state.users, state.setUsers, state.addUsers, state.removeUser]));
  const [messages, setMessages, addMessagesToStore] = useChatRoomStore(useShallow((state) => [state.messages, state.setMessages, state.addMessages]));
  const [id, setId] = useState<string>('');
  const [themeKey, setThemeKey] = useState<ChatListTheme>('base');

  const addMessages = useCallback((newMessages: ChatRoomMessage[] | ChatRoomMessage) => {
    addMessagesToStore(newMessages, onNewMessage);
  }, [addMessagesToStore, onNewMessage]);

  const addUsers = useCallback((newUsers: ChatRoomUser['id'][] | ChatRoomUser['id']) => {
    addUsersToStore(newUsers, onNewUser);
  }, [addUsersToStore, onNewUser]);

  const toJSON = useCallback(() => {
    return JSON.stringify({
      users,
      messages,
    }, null, 2);
  }, [users, messages]);

  const copyAsJSON = useCallback(() => {
    navigator.clipboard.writeText(toJSON());
  }, [toJSON]);

  useEffect(() => {
    if (initialMessages) {
      addMessages(initialMessages);
    }
    setId(nanoid());
  }, [addMessages, initialMessages]);

  const fetchUser = (userId: ChatRoomUser['id']) => {
    if (!userDB[userId]) {
      return userDB.unknown;
    }
    return userDB[userId];
  };

  return (
    <ChatRoomContext.Provider value={{
      users, setUsers, addUsers, removeUser,
      messages, setMessages, addMessages,
      id,
      fetchUser,
      themeKey,
      toJSON, copyAsJSON,
    }}>
      {children}
    </ChatRoomContext.Provider>
  );
};

export const useChatRoom = () => {
  const chatRoomContext = useContext(ChatRoomContext);
  if (!chatRoomContext) {
    throw Error('useChatRoom must be used within a ChatRoomProvider');
  }
  return chatRoomContext;
}
