import { create } from "zustand";
import { Notification } from "@/types/notification";
import {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "@/api/notificationApi";

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  loading: false,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const notifications = await fetchNotifications();
      set({ notifications });
    } finally {
      set({ loading: false });
    }
  },

  markAsRead: async (id) => {
    set({ loading: true });
    try {
      await markNotificationAsRead(id);
      await useNotificationStore.getState().fetchNotifications();
    } finally {
      set({ loading: false });
    }
  },

  deleteNotification: async (id) => {
    set({ loading: true });
    try {
      await deleteNotification(id);
      await useNotificationStore.getState().fetchNotifications();
    } finally {
      set({ loading: false });
    }
  },
}));