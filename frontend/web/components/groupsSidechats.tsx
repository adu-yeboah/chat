import { currentUser } from '@/constants'
import React from 'react'
import Chatui from './ui/chatui'

export default function GroupsSidechats() {
    return (
        <>
            <div className="w-1/4 bg-gray-800 p-4 border-r border-gray-700">

                <div className="flex items-center mb-4 justify-between">
                    <h2 className='text-white text-2xl'>Groups</h2>
                    <div className='text-white cursor-pointer' />
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
                    <Chatui />
                    <Chatui />
                    <Chatui />

                    <Chatui />

                    {/* Add more users as needed */}
                </div>
            </div>
        </>
    )
}
