"use client"
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { FaUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { RiGroupLine } from "react-icons/ri";
import { RiContactsLine } from "react-icons/ri";

export default function Sidebar() {
    return (
        <>
            <div className="fixed h-full w-[50px] top-0 left-0 bg-gray-800">
                <div className="flex flex-col justify-between h-full items-center px-4 py-2.5 shadow">

                    {/* LOGO */}
                    <Link href="/" className="h-8 w-8 relative mt-7">
                        <Image alt='logo' src="/logo.png" layout='fill' objectFit='cover' />
                    </Link>

                    {/* navigation */}
                    <div className="flex flex-col items-center justify-center gap-10">
                        <Link className='p-2' href={"/user"}>
                            <FaUser size={23} className='text-white'/>
                        </Link>

                        <Link className='p-2' href={"/groups"}>
                            <RiGroupLine size={23} className='text-white'/>
                        </Link>

                        <Link className='p-2' href={"/contacts"}>
                            <RiContactsLine size={23} className='text-white'/>
                        </Link>

                        <Link className='p-2' href={"/settings"}>
                            <IoSettingsOutline size={23} className='text-white'/>
                        </Link>

                    </div>

                    {/* seettings */}
                    <Link href={""}></Link>
                </div>
            </div>
        </>
    )
}
