import Sidebar from "@/components/sidebar";
import "../styles/globals.css"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
            <Sidebar />
                <main className='bg-lightGrey ml-[50px]'>
                    {children}
                </main>
            </body>
        </html>
    );
}
