'use client'

import { useChatRoom } from "@/hooks";
import { ChatListThemes, CopyButton, Separator } from "@/components";
import { cn } from "@/utils";

export const ChatRoomInfo: React.FC = () => {
  const {
    users,
    messages,
    id,
    themeKey,
    toJSON,
  } = useChatRoom();

  return (
    <div className={cn("flex flex-col text-muted rounded text-xs justify-self-start")}>
      <div className={cn("flex flex-row justify-between items-center w-full p-1.5 shadow", ChatListThemes[themeKey].primary)}>
        <div className="flex flex-col justify-center items-start">
          <div className="flex flex-row justify-center items-center gap-1">
            <div className="font-semibold">Room:</div>
            <div className="">{id}</div>
          </div>
          <div className="ml-1 text-xs">{users.length} Users</div>
          <div className="ml-1 text-xs">{messages.length} Messages</div>
        </div>
        <div className="flex flex-row justify-between items-start">
          <CopyButton value={toJSON()} />
        </div>
      </div>
      <Separator className="w-full bg-muted" />
    </div>
  )
};
