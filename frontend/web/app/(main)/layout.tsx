"use client"
import Sidebar from "@/components/sidebar";
import "../../styles/globals.css"
import { AuthContextProvider } from "@/context/authContext";
import { FlashMessageProvider } from "flashmessage-js";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Sidebar />
                <main className='bg-gray-900 ml-[50px]'>
                    <AuthContextProvider>
                        <FlashMessageProvider>
                            {children}
                        </FlashMessageProvider>
                    </AuthContextProvider>


                </main>
            </body>
        </html>
    );
}

