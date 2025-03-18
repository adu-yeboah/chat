import React from 'react'
import "../../styles/globals.css"
import { AuthContextProvider } from '@/context/authContext';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
            </body>
        </html>
    )
}
