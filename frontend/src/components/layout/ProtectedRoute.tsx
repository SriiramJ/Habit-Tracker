import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils"

interface ProtectedRouteProps{
    children : React.ReactNode
    redirectTo?: string
}

export default function ProtectedRoute({children, redirectTo = "/login"}:ProtectedRouteProps){
    const {isAuthenticated, loading} = useAuth()
    const router = useRouter()

    useEffect(()=>{
        if(!loading && !isAuthenticated){
            router.replace(redirectTo)
        }
    },[isAuthenticated, loading, router, redirectTo])

    if(loading){
        return(
            <div className={cn("flex items-center justify-center h-screen w-full")}>
                <LoaderIcon className="animate-spin w-8 h-8 text-blue-600"/>
                <span className="ml-2 text-blue-600 font-medium">Checking authentication...</span>
            </div>
        )
    }
    if(!isAuthenticated) return null
    return <>{children}</>
}