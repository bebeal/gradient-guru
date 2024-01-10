'use client'

import { useChatRoom } from "@/hooks";

export const ChatRoomInfo: React.FC = () => {
  const {
    users,
    messages,
    id
  } = useChatRoom();

  return (
    <div className="flex flex-col w-full h-auto text-muted text-xs">
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold">Room ID:</div>
        <div>{id}</div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="">{users.length} Users</div>
        <div className="">{messages.length} Messages</div>
      </div>
    </div>
  )
};
