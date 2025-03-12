import Sidechats from '@/components/sidechats';
import Textbox from '@/components/textbox';
import Headerbar from '@/components/ui/headerbar';
import { messages } from '@/constants';
import React from 'react';


const Home: React.FC = () => {
  // Mock data for demonstration

  return (
    <div className="flex h-screen bg-gray-900 text-white">

      {/* Sidebar */}
      <Sidechats />

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col">

        {/* HEADER */}
        <Headerbar />

        <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${message.isSentByCurrentUser ? 'text-right' : 'text-left'
                }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${message.isSentByCurrentUser
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

          <Textbox />
        </div>
      </div>
    </div>
  );
};

export default Home;