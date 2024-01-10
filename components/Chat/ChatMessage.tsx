'use client';

import { Avatar, Button, ChatRoomMessage, ChatRoomUser, ChatRoomUserMessage, CopyButton, IconSetCache } from '@/components';
import { useChatRoom } from '@/hooks';
import { formatTime, getInitials } from '@/utils';

export interface ChatMessageUserProps {
  user: ChatRoomUser;
}
export const ChatMessageUser = (props: ChatMessageUserProps) => {
  const {
    user
  } = props;

  return (
    <div className="flex items-center space-x-4">
      <Avatar color={user?.color} fallback={user?.icon || getInitials(user?.name || "")} size="8">
        {user?.icon}
      </Avatar>
      <div>
        <div className="font-bold">{user?.name}</div>
        {user?.role !== 'user' && <div className="text-sm text-muted">{user?.role}</div>}
      </div>
    </div>
  )
}

export interface ChatMessageContentProps {
  content: any;
}
export const ChatMessageContent = (props: ChatMessageContentProps) => {
  const { content } = props;
  return (
    <div className="flex-1 overflow-auto">
      <span className="text-base">{content}</span>
    </div>
  )
}

export interface ChatMessageMetaProps {
  message: ChatRoomUserMessage;
}
export const ChatMessageMeta = (props: ChatMessageMetaProps) => {
  const {
    message
  } = props;
  return (
    <div className="flex flex-col items-end space-y-1">
      <div className="flex space-x-1">
        <CopyButton variant="normal" value={message?.content} />
        <Button variant="normal"><IconSetCache.Carbon.ThumbsUp /></Button>
        <Button variant="normal"><IconSetCache.Carbon.ThumbsDown /></Button>
      </div>
      <span className="text-xs text-muted">{formatTime(message?.timestamp)}</span>
    </div>
  )
}

export interface ChatMessageProps {
  chatRoomMessage: ChatRoomMessage;
}
export const ChatMessage = (props: ChatMessageProps) => {
  const {
    chatRoomMessage
  } = props;
  const { fetchUser } = useChatRoom();
  const user = fetchUser(chatRoomMessage.userId);
  const message = chatRoomMessage.message;

  return (
    <div className="p-4 flex space-x-4 items-start">
      <ChatMessageUser user={user} />
      <ChatMessageContent content={message.content} />
      <ChatMessageMeta message={message} />
    </div>
  );
};
