"use client"
import { useAuth } from '@/context/authContext';
import React, { useEffect } from 'react'
import { FaEllipsisH, FaPhone, FaSearch, FaUser, FaVideo } from 'react-icons/fa'
import { HiMiniUserCircle } from "react-icons/hi2";

export default function Headerbar() {
    const { user, getMe } = useAuth()

    useEffect(() => {
        getMe()
    }, [])

    return (
        <>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center">
                    <HiMiniUserCircle className="w-10 h-10 rounded-full mr-2" />
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold">{user?.username}</h2>
                        <span className="ml-2 w-4 h-4 bg-green-500 rounded-full"></span>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <button className="text-gray-400 hover:text-white" aria-label="Search chat">
                        <FaSearch size={20} className='cursor-pointer' />
                    </button>
                    <button className="text-gray-400 hover:text-white" aria-label="Start phone call">
                        <FaPhone size={20} className='cursor-pointer' />
                    </button>
                    <button className="text-gray-400 hover:text-white" aria-label="Start video call">
                        <FaVideo size={20} className='cursor-pointer' />
                    </button>
                    <button className="text-gray-400 hover:text-white" aria-label="View user profile">
                        <FaUser size={20} className='cursor-pointer' />
                    </button>
                    <button className="text-gray-400 hover:text-white" aria-label="More options">
                        <FaEllipsisH size={20} className='cursor-pointer' />
                    </button>
                </div>
            </div>
        </>
    )
}
