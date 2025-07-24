import ProtectedRoute from "@/components/layout/ProtectedRoute";
import GoalList from "@/components/Dashboard/GoalList";

export default function GoalsPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto mt-8">
        <GoalList />
      </div>
    </ProtectedRoute>
  );
}