import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Timer from "@/components/Tools/Timer";

export default function TimerPage() {
  return (
    <ProtectedRoute>
      <Timer />
    </ProtectedRoute>
  );
}