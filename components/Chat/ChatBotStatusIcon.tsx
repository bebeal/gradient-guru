'use client'

import { cn } from "@/utils";
import { ChatBotStatus, IconSetCache } from "@/components";

export const ChatBotStatusIcons: Record<ChatBotStatus, React.FC<any>> = {
  loading: (props: any) => <IconSetCache.Custom.LoadingChat {...props} />,
  idle: (props: any) => <IconSetCache.Carbon.ChatBot {...props} />,
  error: (props: any) => <IconSetCache.Custom.ErrorChat {...props} />,
  disabled: (props: any) => <IconSetCache.Carbon.ChatOff {...props} />,
};

export interface ChatBotStatusIconProps {
  status: ChatBotStatus;
  className?: string;
}

export const ChatBotStatusIcon = (props: ChatBotStatusIconProps) => {
  const { status, className } = props;
  const BotStatus = ChatBotStatusIcons[status];

  return (
    <div className="flex h-stretch w-auto px-1 gap-1 items-center justify-start text-inherit">
      <div className="w-auto h-auto flex">Status:</div>
      <BotStatus className={"w-auto h-auto flex"} status={status} width={"1em"} height={"1em"} color={"currentColor"} />
      <div className={cn("w-auto h-auto flex capitalize", status === 'disabled' ? 'opacity-70':'')}>{status}</div>
    </div>  
  );
};
