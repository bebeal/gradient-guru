'use client'

import { useEffect, useMemo } from "react";
import { ChatBotUsers, ChatRoomUser } from "@/components";
import { useModel, useChatRoom } from "@/hooks";

// Instantiates a bot user 
export const useChatBot = () => {
  const chatRoom = useChatRoom();
  const {
    modelClient
  } = useModel();
  const botUser: ChatRoomUser = useMemo(() => ChatBotUsers[modelClient.config.model], [modelClient.config.model]);
  
  useEffect(() => {
    chatRoom.addUsers(botUser.id);
  }, [chatRoom, botUser]);

  return {
    botUser,
  }
}
