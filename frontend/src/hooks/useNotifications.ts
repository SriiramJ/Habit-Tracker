import { useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import { Notification } from "@/types/notification";

// Custom hook to manage notifications state and actions
export function useNotifications(){
    const {
        notifications,
        loading,
        fetchNotifications,
        markAsRead,
        deleteNotification
    } = useNotificationStore()

    useEffect(()=>{
        fetchNotifications()
    })
    return {
    notifications,
    loading,
    fetchNotifications,
    markAsRead,
    deleteNotification,
  };
}