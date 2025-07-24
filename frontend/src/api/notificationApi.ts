import api from "@/utils/api";
import { Notification } from "@/types/notification";

export async function fetchNotifications(): Promise<Notification[]> {
  const res = await api.get("/notification");
  return res.data;
}

export async function markNotificationAsRead(id: string): Promise<void> {
  await api.put(`/notification/${id}`, { read: true });
}

export async function deleteNotification(id: string): Promise<void> {
  await api.delete(`/notification/${id}`);
}