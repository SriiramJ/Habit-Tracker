import type { AppProps } from "next/app";
import {ClerkProvider} from "@clerk/nextjs"
import { Toaster } from "sonner";
import LogRocket from "logrocket";
import { useEffect } from "react";
import "@/styles/globals.css"
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function MyApp({Component, pageProps}: AppProps){
    useEffect(()=>{
        if(typeof window !== "undefined" && process.env.NEXT_PUBLIC_LOGROCKET_ID){
            LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_ID)
        }
    },[])

    return(
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar/>
                <div className="flex-1 ml-64">
                    <Navbar/>
                    <main className="pt-20 px-6">
                        <Component {...pageProps}/>
                    </main>
                </div>
            </div>
            <Toaster richColors position="top-right"/>
        </ClerkProvider>
    )
}