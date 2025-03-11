import React from 'react';

import { User, Message } from '../types/chat';

const Chat: React.FC = () => {
  // Mock data for demonstration
  const currentUser: User = { id: '1', name: 'Shikha Gupta', avatar: '/avatar1.png', status: 'active' };
  const otherUser: User = { id: '2', name: 'John Doe', avatar: '/avatar2.png', status: 'active' };

  const messages: Message[] = [
    { id: '1', sender: otherUser, content: 'Hi', timestamp: '11:12 pm' },
    { id: '2', sender: otherUser, content: 'Hey! How are you doing? I was wondering if I can share the documents with me by today itself...', timestamp: '11:13 pm' },
    { id: '3', sender: currentUser, content: 'I am doing great. How are you doing?', timestamp: '11:14 pm' },
    { id: '4', sender: currentUser, content: 'Please give me some time.', timestamp: '11:14 pm' },
    { id: '5', sender: otherUser, content: 'As I am already working on that document.', timestamp: '11:15 pm' },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-4 border-r border-gray-700">
        <div className="flex items-center mb-4">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full mr-2" />
          <h2 className="text-lg font-semibold">{currentUser.name}</h2>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm text-gray-400">ACTIVE NOW</h3>
          <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
            <img src={otherUser.avatar} alt={otherUser.name} className="w-10 h-10 rounded-full mr-2" />
            <div>
              <p className="text-sm">{otherUser.name}</p>
              <p className="text-xs text-gray-500">Active Now</p>
            </div>
          </div>
          {/* Add more users as needed */}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col">
        <div className="flex items-center p-4 border-b border-gray-700">
          <img src={otherUser.avatar} alt={otherUser.name} className="w-10 h-10 rounded-full mr-2" />
          <h2 className="text-lg font-semibold">{otherUser.name}</h2>
          <span className="ml-2 text-sm text-green-500">Active Now</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.isSentByCurrentUser ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.isSentByCurrentUser
                    ? 'bg-purple-600'
                    : 'bg-gray-700'
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs text-gray-400">{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 p-2 rounded-l bg-gray-700 text-white focus:outline-none"
            />
            <button className="p-2 bg-pink-600 rounded-r">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;