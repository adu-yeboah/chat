import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
    return (
        <>
            <div className="fixed h-full w-[50px] top-0 left-0 bg-white">
                <div className="flex flex-col justify-around items-center px-4 py-2.5 shadow">

{/* LOGO */}
                    <div className="h-8 w-8">

                    </div>
{/* navigation */}
                    <div className="flex flex-col items-center justify-center gap-6">
                        <Link href={""}>

                        </Link>

                        <Link href={""}>

                        </Link>

                        <Link href={""}>

                        </Link>

                        <Link href={""}>

                        </Link>

                    </div>

{/* seettings */}
                    <Link href={""}></Link>
                </div>
            </div>
        </>
    )
}
