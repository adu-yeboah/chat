"use client"
import React from 'react'
import "../../styles/globals.css"
import { AuthContextProvider } from '@/context/authContext';
// import { FlashMessageProvider } from '@/lib/flash';
import { FlashMessageProvider } from 'flashmessage-js';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <html lang="en">
            <body>
                <AuthContextProvider>
                    <FlashMessageProvider>
                        {children}
                    </FlashMessageProvider>
                </AuthContextProvider>
            </body>
        </html>
    )
}
