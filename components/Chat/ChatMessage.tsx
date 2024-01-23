'use client';

import { Avatar, ChatRoomMessage, ChatRoomUser, ChatRoomUserMessage, CopyButton } from '@/components';
import { useChatRoom } from '@/hooks';
import { cn, formatTime, getInitials } from '@/utils';

export interface ChatMessageUserProps {
  user: ChatRoomUser;
}
export const ChatMessageUser = (props: ChatMessageUserProps) => {
  const {
    user,
    ...rest
  } = props;

  return (
    <div className="flex flex-col items-center gap-1 max-w-24 w-auto h-full p-1 px-2 text-pretty">
      <Avatar border={""} color={user?.color} fallback={user?.icon || getInitials(user?.name || "")} size={user?.size} width={user?.width} height={user?.height} {...rest}>
        {user?.icon}
      </Avatar>
      {user?.role !== 'user' && <div className="text-xs text-gray-300">{user?.role}</div>}
    </div>
  )
}

export interface ChatMessageContentProps {
  content: any;
  showName?: boolean;
  name?: string;
}
export const ChatMessageContent = (props: ChatMessageContentProps) => {
  const { content, showName=true, name=''} = props;
  return (
    <div className="flex flex-col w-full p-1 text-base gap-1 break-all text-pretty flex-wrap">
      {showName && name && (
        <div className="flex font-semibold h-auto text-start leading-none">{name}</div>
      )}
      <div className="flex w-full leading-normal">{content}</div>
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
    <div className="flex flex-col items-end p-1 w-auto flex-wrap break-all text-xs flex-shrink px-2 max-w-24">
      <span className="text-gray-300 font-bold mb-2">{formatTime(message?.timestamp)}</span>
      <div className="text-primary">
        {message?.tokensCount && <span>Tokens: {message?.tokensCount}</span>}
      </div>
      <div className="flex">
        <CopyButton variant="normal" value={message?.content} />
        {/* <Button variant="normal"><IconSetCache.Carbon.ThumbsUp /></Button>
        <Button variant="normal"><IconSetCache.Carbon.ThumbsDown /></Button> */}
      </div>
    </div>
  )
}

export interface ChatMessageProps {
  chatRoomMessage: ChatRoomMessage;
  className?: string;
}
export const ChatMessage = (props: ChatMessageProps) => {
  const {
    chatRoomMessage,
    className,
  } = props;
  const { fetchUser } = useChatRoom();
  const user = fetchUser(chatRoomMessage.userId);
  const message = chatRoomMessage.message;
  return (
    <div className={cn("p-4 flex items-start w-full", className)}>
      <ChatMessageUser user={user} />
      <ChatMessageContent content={message.content} showName={true} name={user?.name} />
      <ChatMessageMeta message={message} />
    </div>
  );
};
