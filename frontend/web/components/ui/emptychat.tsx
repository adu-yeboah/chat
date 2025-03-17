import React from 'react'
import { PiChatsDuotone } from 'react-icons/pi'

export default function EmptyChat() {
  return (
    <>
      <div className="flex w-3/4 flex-col items-center justify-center">
        <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center text-white">
          {/* WhatsApp Logo */}
          <div className="mb-6">
            <PiChatsDuotone size={60} className="opacity-50" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold mb-4">Chats</h1>

          {/* Description */}
          <p className="text-gray-400 max-w-md">
            Send and receive messages. 
          </p>
        </section>
      </div>
    </>
  )
}
