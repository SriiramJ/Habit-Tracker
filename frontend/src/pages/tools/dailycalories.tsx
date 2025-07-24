import ProtectedRoute from "@/components/layout/ProtectedRoute";
import GetDailyCalories from "@/components/Tools/DailyCalories";

export default function DailyCaloriesPage() {
  return (
    <ProtectedRoute>
      <GetDailyCalories />
    </ProtectedRoute>
  );
}