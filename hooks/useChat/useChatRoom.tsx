'use client'

import { create } from 'zustand';
import { nanoid } from '@/utils';
import { ChatRoomMessage, ChatRoomUser } from '@/components';
import { createContext, useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';

export type ChatRoomStoreState = {
  userDB: Record<ChatRoomUser['id'], ChatRoomUser>;
  users: ChatRoomUser['id'][];
  setUsers: (newUsers: ChatRoomUser['id'][]) => void;
  removeUser: (userId: ChatRoomUser['id']) => void;
  addUser: (newUser: ChatRoomUser['id']) => void;
  messages: ChatRoomMessage[];
  setMessages: (newMessages: ChatRoomMessage[]) => void;
  addMessage: (newMessage: ChatRoomMessage) => void;
  id: string;
};

// Factory function to create a store for a single instance of a chat room
export const createChatRoomStore = () => create<ChatRoomStoreState>((set) => ({
  userDB: {},
  users: [],
  setUsers: (newUsers) => set({ users: newUsers }),
  removeUser: (userId) => set((state) => ({ users: state.users.filter((user) => user !== userId) })),
  addUser: (newUser) => set((state) => ({ users: Array.from(new Set([...state.users, newUser])) })),
  messages: [],
  setMessages: (newMessages) => set({ messages: newMessages }),
  addMessage: (newMessage) => set((state) => ({ messages: [...state.messages, newMessage] })),
  id: nanoid(),
}));

export type ChatRoomOps = {
  fetchUser: (userId: ChatRoomUser['id']) => ChatRoomUser;
}

export type ChatRoomState = ChatRoomStoreState & ChatRoomOps;


// top level chat room provider for which all children will pull from. encapsulates the chat room store
export const ChatRoomContext = createContext<ChatRoomState>({} as ChatRoomState);
export const ChatRoomProvider = ({ children }: { children: React.ReactNode }) => {
  const useChatRoomStore = createChatRoomStore();
  const userDB = useChatRoomStore(useShallow((state) => state.userDB));
  const [users, setUsers, addUser, removeUser] = useChatRoomStore(useShallow((state) => [state.users, state.setUsers, state.addUser, state.removeUser]));
  const [messages, setMessages, addMessage] = useChatRoomStore(useShallow((state) => [state.messages, state.setMessages, state.addMessage]));
  const id = useChatRoomStore(useShallow((state) => state.id));

  const fetchUser = (userId: ChatRoomUser['id']) => {
    return userDB[userId];
  };

  return (
    <ChatRoomContext.Provider value={{
      userDB,
      users, setUsers, addUser, removeUser,
      messages, setMessages, addMessage,
      id,
      fetchUser,
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
