'use client'

import { Avatar, CopyButton } from '@/components';
import { ChatUsers, UserMessage } from '@/hooks';
import { cn, formatTime, getInitials } from '@/utils';

export const UserThemes: Record<string, string> = {
  default: 'bg-primary text-primary',
  primary: 'bg-[#343541] text-primary',
  secondary: 'bg-[#40414F] text-primary',
};

export interface ChatMessageProps extends UserMessage {
  showName?: boolean
}

export const ChatMessage = ({
  user=ChatUsers('user'),
  message,
  showName = false,
}: ChatMessageProps) => {
  return (
    <div className={cn('p-4 w-full flex justify-between items-start', UserThemes[user?.theme as any])}>
      <div className="flex items-start w-full gap-4">
        <Avatar color={user?.color} fallback={user?.icon || getInitials(user?.name || "")} size="8">
          {user?.icon}
        </Avatar>
        <div className="flex flex-col w-full">
          {showName && user?.name && (
            <span className="flex font-semibold text-lg">{user?.name}</span>
          )}
          <span className="flex text-base w-full">{message?.content}</span>
        </div>
      </div>
      <div className="flex items-start w-auto gap-1 overflow-hidden">
        <div className="flex w-auto h-auto self-start">
          <CopyButton className="text-slate" value={message?.content} />
        </div>
        <span className="flex text-xs text-gray-400 w-auto text-center self-start justify-start">{formatTime(message?.timestamp)}</span>
      </div>
    </div>
  )
};
