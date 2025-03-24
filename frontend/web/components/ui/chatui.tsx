import { Group } from '@/types/groups'
import React from 'react'
import { MdOutlineGroups } from 'react-icons/md'

interface ChatUiProps {
    data: Group
}
export default function Chatui({ data }: ChatUiProps) {
    return (
        <>
            <div className="flex items-center p-2 px-3 hover:bg-gray-700 rounded cursor-pointer relative">
                <MdOutlineGroups className="w-10 h-10 rounded-full mr-2" />
                <div>
                    <p className="text-sm">{data?.name}</p>
                    <p className="text-xs text-gray-500 w-min overflow-ellipsis whitespace-nowrap">""</p>
                </div>
                <div className="text-sm absolute top-1 right-1 text-gray-500">10:00pm</div>
            </div>
        </>
    )
}
