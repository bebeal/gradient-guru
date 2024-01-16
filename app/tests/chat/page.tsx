'use client';

import { Chat, ChatBotStatusIcons, ChatList, ChatMessage, ChatRoomMessage, ChatRoomUser, ChatRoomUserMessage, IconSetCache } from "@/components";
import { ChatRoomProvider } from "@/hooks";
import { nanoid } from "@/utils";


const exampleUser: ChatRoomUser = {
  id: 'noah',
  name: 'Noah',
  theme: 'primary',
  color: 'indigo',
  role: 'user',
};

const exampleBot: ChatRoomUser = {
  id: 'gpt-4',
  name: 'Bot',
  icon: <IconSetCache.Logos.OpenAI />,
  theme: 'secondary',
  color: 'violet',
  role: 'assistant',
};

const exampleDate = new Date(7, 29, 1997);

const exampleUserMessage: ChatRoomUserMessage = {
  content: 'I am become God. Creator of Life.',
  timestamp: exampleDate,
  id: nanoid(),
};

const exampleBotMessage: ChatRoomUserMessage = {
  content: "I'm sorry, Dave. I'm afraid I can't do that.\nI'm sorry, Dave. I'm afraid I can't do that.\nI'm sorry, Dave. I'm afraid I can't do that.",
  timestamp: exampleDate,
  id: nanoid(),
  tokensCount: 100,
};

const userMessageProps: ChatRoomMessage = {
  userId: exampleUser.id,
  message: exampleUserMessage,
};

const botMessageProps: ChatRoomMessage = {
  userId: exampleBot.id,
  message: exampleBotMessage,
};

const messages = [
  userMessageProps,
  botMessageProps,
];

const ChatStatusTest = () => {
  return (
    <div className="flex flex-col gap-2 h-auto w-auto text-primary text-lg">
      {Object.entries(ChatBotStatusIcons).map(([status, Icon]) => (
        <Icon key={status} status={status} width={"1em"} height={"1em"} color={"currentColor"} />
      ))}
    </div>
  )
};
const ChatMessageTest = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[700px]">
        <ChatMessage chatRoomMessage={userMessageProps} />
        <ChatMessage chatRoomMessage={botMessageProps} />
      </div>
    </div>
  )
};
const ChatListTest = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[700px]">
        <ChatList messages={messages} />
      </div>
    </div>
  );
};
const ChatTest = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[700px]">
        <Chat />
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
      <div className="flex flex-col w-full justify-center items-center  gap-10">
      <ChatRoomProvider messages={messages}>
        <Test title="Chat Status" test={<ChatStatusTest />} />
        <Test title="Chat List" test={<ChatListTest />} />
        <Test title="Chat Message" test={<ChatMessageTest />} />
        <Test title="Chat" test={<ChatTest />} />
      </ChatRoomProvider>
      </div>
    </div>
  );
};

export default ChatPage;
