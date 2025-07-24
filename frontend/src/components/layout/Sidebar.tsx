import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { FaFire,FaGift  } from "react-icons/fa";
import { TargetIcon, ListBulletIcon, ChatBubbleIcon, BarChartIcon, GearIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const navItems = [
    {href: "/dashboard", label: "Dashboard", icon : <BarChartIcon className="w-5 h-5" />},
    {href: "/habits", label: "Habits", icon: <ListBulletIcon className="w-5 h-5"/>},
    {href: "/goals", label:"Goals", icon: <TargetIcon className="w-5 h-5"/>},
    {href: "/rewards", label:"Rewards", icon: <FaGift className="w-5 h-5"/>},
    {href: "/chatbot", label:"Chatbot", icon: <ChatBubbleIcon className="w-5 h-5"/>},
    {href: "/tools/bmi", label:"Tools", icon: <GearIcon className="w-5 h-5"/>},
]

export default function Sidebar(){
    const {user, isAuthenticated} = useAuth()

    return(
        <aside
        className={cn(
            "fixed left-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col justify-between py-6 px-4 z-40"
        )}
        >
            {/* Top: Logo & Streak */}
            <div>
                <div className="flex items-center gap-2 mb-8">
                    <span className="text-3xl streak-icon">🔥</span>
                    <span className="font-bold text-xl text-blue-600">Habit Tracker AI</span>
                </div>
                <nav>
                    <ul className="space-y-2">
                        {navItems.map((item)=>(
                            <li key={item.href}>
                                <Link
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50 transition font-medium text-gray-700"
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/*Bottom: User Info */}
            <div className="border-t pt-4 flex items-center gap-3">
                <span className="bg-blue-100 rounded-full w-9 h-9 flex items-center justify-center text-blue-600 font-bold">
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <div>
                    <div className="font-semibold text-gray-800">{user?.username || user?.email || "Guest"}</div>
                    <div className="text-xs text-gray-500">{isAuthenticated ? "Logged in": "Not logged in"}</div>
                </div>
            </div>
        </aside>
    )
}