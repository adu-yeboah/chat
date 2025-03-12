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
            <div className="fixed h-full w-[50px] top-0 left-0 bg-white">
                <div className="flex flex-col justify-between h-full items-center px-4 py-2.5 shadow">

                    {/* LOGO */}
                    <div className="h-8 w-8 relative mt-7">
                        <Image alt='logo' src="/logo.png" layout='fill' objectFit='cover' />
                    </div>

                    {/* navigation */}
                    <div className="flex flex-col items-center justify-center gap-10">
                        <Link href={"/user"}>
                            <FaUser size={23} className='text-black'/>
                        </Link>

                        <Link href={"/groups"}>
                            <RiGroupLine size={23} className='text-black'/>
                        </Link>

                        <Link href={"/contacts"}>
                            <RiContactsLine size={23} className='text-black'/>
                        </Link>

                        <Link href={"/settings"}>
                            <IoSettingsOutline size={23} className='text-black'/>
                        </Link>

                    </div>

                    {/* seettings */}
                    <Link href={""}></Link>
                </div>
            </div>
        </>
    )
}
