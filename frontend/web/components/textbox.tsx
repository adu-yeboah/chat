"use client"
import React, { useState } from 'react'
import { FaImage, FaLink, FaPaperPlane, FaSmile } from 'react-icons/fa';

export default function Textbox() {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
          console.log('Sending message:', message);
          setMessage(''); 
        }
      };
    return (
        <>
            <div className="p-2">
                <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                    <input
                        type="text"
                        placeholder="Enter Message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 p-4 bg-gray-700 text-white focus:outline-none"
                    />
                    <div className="flex items-center space-x-2 pr-3">
                        <button className="text-gray-400 hover:text-white">
                            <FaSmile size={20} />
                        </button>
                        <button className="text-gray-400 hover:text-white">
                            <FaLink size={20} />
                        </button>
                        <button className="text-gray-400 hover:text-white">
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
        </>
    )
}
