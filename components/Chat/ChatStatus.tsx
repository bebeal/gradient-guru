
import { cn } from "@/utils";
import { IconSetCache } from "..";
import { ChatStatusEnum } from "@/hooks";


export interface ChatStatusProps {
  status: ChatStatusEnum;
  className?: string;
}

export const ChatStatusIcon = (props: ChatStatusProps & any) => {
  const {
    status=ChatStatusEnum.Idle,
    className,
    ...rest
  } = props;
  const mapping = {
    [ChatStatusEnum.Append]:    <IconSetCache.Carbon.AddComment className={cn(className)} {...rest} />,
    [ChatStatusEnum.Loading]:   <IconSetCache.Custom.LoadingChat className={cn(className)} {...rest} />,
    [ChatStatusEnum.Idle]:      <IconSetCache.Carbon.ChatBot className={cn(className)} {...rest} />,
    [ChatStatusEnum.Error]:     <IconSetCache.Custom.ErrorChat className={cn(className)} {...rest} />,
    [ChatStatusEnum.Focus]:     <IconSetCache.Custom.FocusChat className={cn(className)} {...rest} />,
    [ChatStatusEnum.Disabled]:  <IconSetCache.Carbon.ChatOff className={cn('opacity-70', className)} {...rest} />,
    [ChatStatusEnum.Share]:     <IconSetCache.Carbon.ChatLaunch className={cn(className)} {...rest} />,
  }
  return mapping[status as ChatStatusEnum] || mapping[ChatStatusEnum.Idle];
};

export const ChatStatus = (props: ChatStatusProps) => {
  const { status } = props;
  return (
    <div className="flex h-stretch w-auto px-1 gap-1 items-center justify-start text-inherit">
      <div className="w-auto h-auto flex">Status: </div>
      <ChatStatusIcon className={"w-auto h-auto flex"} status={status} width={"1em"} height={"1em"} color={"currentColor"} />
      <div className={cn("w-auto h-auto flex capitalize", status === ChatStatusEnum.Disabled ? 'opacity-70':'')}>{status}</div>
    </div>  
  );
};
