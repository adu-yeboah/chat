"use client";
import Sidechats from "@/components/sidechats";
import Textbox from "@/components/textbox";
import Headerbar from "@/components/ui/headerbar";
import { useAuth } from "@/context/authContext";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const { user, getMe, messages } = useAuth();
  const [chatId, setChatId] = useState<string | undefined>(undefined);

  useEffect(() => {
    getMe();
  }, []);

  const handleChatSelect = (chatId: string) => {
    setChatId(chatId);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidechats onChatSelect={handleChatSelect} />

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col">
        {/* HEADER */}
        <Headerbar />

        <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
          {messages && messages?.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${message.sender_id === user?.id ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender_id === user?.id ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs text-gray-400">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700">
          <Textbox chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default Home;