import { currentUser, otherUser } from '@/constants'
import React from 'react'

export default function Sidechats() {
    return (
        <>
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
                    <h3 className="text-sm text-gray-400">Recent</h3>

                   

                    {/* Add more users as needed */}
                </div>
            </div>
        </>
    )
}
