"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import ChatItem from "@/components/chat-item/ChatItem";
import Input from "@/components/ui/input/Input";
import ChatMessage from "@/components/chat-message/ChatMessage";
import useChatSection from "@/hooks/useChatSection";

const chats = [
  { id: 1, userName: "John Doe", message: "Hey, how are you?" },
  {
    id: 2,
    userName: "Jane Smith",
    message: "Let's meet tomorrow for the project discussion.",
  },
  {
    id: 3,
    userName: "Peter Jones",
    message:
      "I have a very long message that should be truncated at some point.",
  },
];

const messages = [
  { id: 1, text: "Hey, how are you?", isSender: false },
  { id: 2, text: "I'm good, thanks! How about you?", isSender: true },
  { id: 3, text: "I'm doing great!", isSender: false },
];

export default function ChatSection() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");
  const { handleSignOut, isLoggingOut } = useChatSection();

  return (
    <div className="w-full h-screen flex flex-col bg-neutral-900 text-white">
      <div className="flex justify-end py-1 px-2 border-b border-b-neutral-600">
        <Button
          className="bg-red-500"
          onClick={handleSignOut}
          loading={isLoggingOut}
          disabled={isLoggingOut}
        >
          Log Out
        </Button>
      </div>
      <div className="h-full flex">
        <div className="w-80 h-full border-r border-r-neutral-600 flex flex-col">
          {chats.map((chat) => (
            <Link href={`/chat?id=${chat.id}`} key={chat.id}>
              <ChatItem
                userName={chat.userName}
                message={chat.message}
                isSelected={parseInt(chatId) === chat.id}
              />
            </Link>
          ))}
        </div>
        <div className="grow flex flex-col">
          {!chatId ? (
            <div className="grow flex justify-center items-center backdrop-blur-sm">
              <p className="text-2xl text-slate-400">
                Choose who you want to chat with
              </p>
            </div>
          ) : (
            <>
              <div className="grow p-4 overflow-y-auto flex flex-col gap-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.text}
                    isSender={message.isSender}
                  />
                ))}
              </div>
              <div className="p-4 border-t border-t-neutral-600 flex items-center gap-2">
                <Input placeholder="Type your message..." className="grow" />
                <Button>Send</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
