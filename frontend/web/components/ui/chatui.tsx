import { otherUser } from '@/constants'
import React from 'react'

export default function Chatui() {
    return (
        <>
            <div className="flex items-center p-2 px-3 hover:bg-gray-700 rounded cursor-pointer relative">
                <img src={otherUser.avatar} alt={otherUser.name} className="w-10 h-10 rounded-full mr-2" />
                <div>
                    <p className="text-sm">{otherUser.name}</p>
                    <p className="text-xs text-gray-500 w-min overflow-ellipsis whitespace-nowrap">last message</p>
                </div>
                <div className="text-sm absolute top-1 right-1 text-gray-500">10:00pm</div>
            </div>
        </>
    )
}
