import ProtectedRoute from "@/components/layout/ProtectedRoute";
import RewardList from "@/components/Dashboard/RewardList";

export default function RewardsPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto mt-8">
        <RewardList />
      </div>
    </ProtectedRoute>
  );
}