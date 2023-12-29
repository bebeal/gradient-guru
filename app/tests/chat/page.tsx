'use client';

import { Chat, ChatList, ChatMessage, ChatMessageProps, ChatStatus, IconSetCache } from "@/components";
import { ChatStatusEnum, Message, User } from "@/hooks";


const exampleUser: User = {
  id: 'Noah',
  name: 'Noah',
  theme: 'primary',
  color: 'indigo',
  type: 'user',
};

const exampleBot: User = {
  id: 'Bot',
  name: 'Bot',
  icon: <IconSetCache.Logos.OpenAI />,
  theme: 'secondary',
  color: 'violet',
  type: 'assistant',
};

const exampleDate = new Date(7, 29, 1997);

const exampleUserMessage: Message = {
  content: 'I am become God. Creator of Life.',
  timestamp: exampleDate,
};

const exampleBotMessage: Message = {
  content: "I'm sorry, Dave. I'm afraid I can't do that.\nI'm sorry, Dave. I'm afraid I can't do that.\nI'm sorry, Dave. I'm afraid I can't do that.",
  timestamp: exampleDate,
};

const userMessageProps: ChatMessageProps = {
  user: exampleUser,
  message: exampleUserMessage,
};

const botMessageProps: ChatMessageProps = {
  user: exampleBot,
  message: exampleBotMessage,
};

const ChatStatusTest = () => {
  return (
    <div className="flex flex-col gap-2 h-auto w-auto text-primary text-lg">
      {Object.values(ChatStatusEnum).map(status => (
        <ChatStatus key={status} status={status} />
      ))}
    </div>
  )
};
const ChatMessageTest = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[700px]">
        <ChatMessage {...userMessageProps} />
        <ChatMessage {...botMessageProps} />
      </div>
    </div>
  )
};
const ChatListTest = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[700px]">
        <ChatList messages={[
            userMessageProps,
            botMessageProps,
            userMessageProps,
            botMessageProps,
          ]}
        />
      </div>
    </div>
  );
};
const ChatTest = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[700px]">
        <Chat 
          initialMessages={[
            userMessageProps,
            botMessageProps,
            userMessageProps,
            botMessageProps,
          ]} />
      </div>
    </div>
  )
};

const Test = ({title, test}: any) => {
  return (
    <div className="flex flex-col items-center justify-center w-auto h-full overflow-hidden bg-primary text-primary gap-2 border border-primary p-2 rounded">
      <div className="flex flex-col items-center justify-center h-auto w-auto text-primary text-lg p-1">
        <h1 className="text-2xl">{title}</h1>
        <div className="flex flex-row items-center justify-center h-auto w-auto gap-2">
          {test}
        </div>
      </div>
    </div>
  );
};

const ChatPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-auto bg-primary text-primary">
      <div className="flex flex-col gap-10 w-full justify-center items-center">
          <Test title="Chat Status" test={<ChatStatusTest />} />
          <Test title="Chat Message" test={<ChatMessageTest />} />
          <Test title="Chat List" test={<ChatListTest />} />
          <Test title="Chat" test={<ChatTest />} />
      </div>
    </div>
  );
};

export default ChatPage;
