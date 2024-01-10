'use client'

import { ChatBotUsers, ChatRoomUser } from "@/components";
import { useChatRoom, useModel } from "@/hooks";
import { useEffect, useMemo } from "react";

// Instantiates a bot user 
export const useChatBot = () => {
  const chatRoom = useChatRoom();
  const {
    modelClient
  } = useModel();
  const botUser: ChatRoomUser = useMemo(() => ChatBotUsers[modelClient.config.model], [modelClient.config.model]);
  
  useEffect(() => {
    chatRoom.addUser(botUser.id);
  }, [chatRoom, botUser]);

  return {
    botUser,
  }
}
