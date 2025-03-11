import { otherUser } from '@/constants'
import React from 'react'
import { FaEllipsisH, FaPhone, FaSearch, FaUser, FaVideo } from 'react-icons/fa'

export default function Headerbar() {
    return (
        <>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center">
                    <img src={otherUser.avatar} alt={otherUser.name} className="w-10 h-10 rounded-full mr-2" />
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold">{otherUser.name}</h2>
                        <span className="ml-2 w-4 h-4 bg-green-500 rounded-full"></span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-white" aria-label="Search chat">
                        <FaSearch size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-white" aria-label="Start phone call">
                        <FaPhone size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-white" aria-label="Start video call">
                        <FaVideo size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-white" aria-label="View user profile">
                        <FaUser size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-white" aria-label="More options">
                        <FaEllipsisH size={20} />
                    </button>
                </div>
            </div>
        </>
    )
}
