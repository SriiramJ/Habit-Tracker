import ProtectedRoute from "@/components/layout/ProtectedRoute";
import NotificationList from "@/components/Dashboard/NotificationList";

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto mt-8">
        <NotificationList />
      </div>
    </ProtectedRoute>
  );
}