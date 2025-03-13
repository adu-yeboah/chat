import { messages } from '@/constants'
import React from 'react'

export default function Chatbubble() {
    return (
        <>
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`mb-4 ${message.isSentByCurrentUser ? 'text-right' : 'text-left'}`}
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
        </>
    )
}