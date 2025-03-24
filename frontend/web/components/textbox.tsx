"use client";
import React, { useState } from "react";
import { FaImage, FaLink, FaPaperPlane, FaSmile } from "react-icons/fa";
import { useAuth } from "@/context/authContext";

export default function Textbox({ chatId }: { chatId?: string }) {
  const [message, setMessage] = useState("");
  const { sendMessage } = useAuth(); 

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = {
        action: "message",
        content: message,
      };
      sendMessage(messageData?.content);
      console.log("Sending message:", messageData);
      setMessage("");
    }
  };

  return (
    <div className="p-2">
      <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Enter Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-4 bg-gray-700 text-white focus:outline-none"
        />
        <div className="flex items-center space-x-4 pr-3">
          <button className="text-gray-400 cursor-pointer hover:text-white">
            <FaSmile size={20} />
          </button>
          <button className="text-gray-400 cursor-pointer hover:text-white">
            <FaLink size={20} />
          </button>
          <button className="text-gray-400 cursor-pointer hover:text-white">
            <FaImage size={20} />
          </button>
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
          >
            <FaPaperPlane size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}