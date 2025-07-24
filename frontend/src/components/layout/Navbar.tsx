import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useNotifications } from "@/hooks/useNotifications"
import { BellIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { FaFire, FaUser } from "react-icons/fa";

export default function Navbar(){
    const {user, isAuthenticated, logout} = useAuth()
    const {notifications} = useNotifications()

    const unreadCount = notifications.filter((n)=> !n.read).length

    return(
        <nav
        className={cn(
            "w-full bg-white shadow flex items-center justify-between px-6 py-3 fixed top-0 left-0 z-50"
        )}
        >
            {/* Logo & App Name */}
            <div className="flex items-center gap-2">
                <span className="text-2xl streak-icon">🔥</span>
                <Link href="/dashboard" className="font-bold text-lg text-blue-600" >Habit Tracker AI</Link>
            </div>
            {/* Main Navigation Links */}
            <div className="flex items-center gap-6">
                <Link href="/dashboard" className="hover:text-blue-500 font-medium">Dashboard</Link>
                <Link href="/habits" className="hover:text-blue-500 font-medium">Habits</Link>
                <Link href="/goals" className="hover:text-blue-500 font-medium">Goals</Link>
                <Link href="/rewards" className="hover:text-blue-500 font-medium">Rewards</Link>
                <Link href="/chatbot" className="hover:text-blue-500 font-medium">Chatbot</Link>
                <Link href="/tools/bmi" className="hover:text-blue-500 font-medium">Tools</Link>
            </div>
            {/* User & Notifications */}
            <div className="flex items-center gap-4">
                <Link href="/notifications" className="relative">
                <Button variant="ghost" size="icon" aria-label = "Notifications">
                    <BellIcon className="w-5 h-5"/>
                    {unreadCount > 0 &&(
                        <span className="notification-badge absolute -top-1 -right-1">{unreadCount}</span>
                    )}
                </Button>
                </Link>
                {isAuthenticated?(
                    <>
                    <Link href="/profile" className="flex items-center gap-2">
                    <FaUser className="w-5 h-5"/>
                    <span className="font-medium">{user?.username || user?.email}</span>
                    </Link>
                    <Button
                    variant= "outline"
                    size= "sm"
                    onClick={logout}
                    className= "ml-2"
                    >Logout</Button>
                    </>
                ):(
                    <>
                    <Link href="/login">
                    <Button variant="default" size="sm">
                        Login
                    </Button>
                    </Link>
                    <Link href="/register">
                    <Button variant="secondary" size="sm">
                        Register
                    </Button>
                    </Link>
                    </>
                )}
            </div>
        </nav>
    )
}