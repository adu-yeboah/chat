import React, { useEffect } from 'react'
import Chatui from './ui/chatui'
import { useAuth } from '@/context/authContext'
import { HiMiniUserCircle } from 'react-icons/hi2'
import { useGroup } from '@/utils/group'


interface SidechatsProps {
    onChatSelect?: (chatId: string) => void
}
export default function Sidechats({onChatSelect} :  SidechatsProps ) {
    const { user } = useAuth()
    const { getOnlineUsers, onlineUsers } = useGroup();

    useEffect(() => {
        getOnlineUsers();
    }, []);

    return (
        <>
            <div className="w-1/4 bg-gray-800 p-4 border-r border-gray-700">
                <div className="flex items-center mb-4">
                    <HiMiniUserCircle className="w-10 h-10 rounded-full mr-2" />
                    <h2 className="text-lg font-semibold">{user?.username}</h2>
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

                    {onlineUsers && onlineUsers.map((data, index) => (
                        <Chatui data={data} key={index}/>
                    ))}

                    {/* Add more users as needed */}
                </div>
            </div>
        </>
    )
}
