import { useNotifications } from "@/hooks/useNotifications";
import { Card } from "../ui/Card";
import { BellIcon } from "lucide-react";

export default function NotificationList(){
    const {notifications, loading, markAsRead} = useNotifications()

    return(
        <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BellIcon className="text-blue-500 w-5 h-5"/>Notifications
            </h3>
            <Card>
                {loading ? (
                    <div>Loading notifications...</div>
                ): notifications.length === 0?(
                    <div className="text-gray-500">No notifications.</div>
                ):(
                    <ul className="space-y-2">
                        {notifications.map((n)=>(
                            <li key={n._id} className="flex items-center justify-between">
                                <span className={n.read ? "text-gray-500" : "font-semibold" }>{n.message}</span>
                                {!n.read && (
                                    <button
                                    className="notification-badge ml-2"
                                    onClick={()=> markAsRead(n._id)}
                                    >Mark as read</button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </section>
    )
}