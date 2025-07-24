import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Stopwatch from "@/components/Tools/Stopwatch";

export default function StopwatchPage() {
  return (
    <ProtectedRoute>
      <Stopwatch />
    </ProtectedRoute>
  );
}