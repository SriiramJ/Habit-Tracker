import ProtectedRoute from "@/components/layout/ProtectedRoute";
import GetBMR from "@/components/Tools/BMRCalculator";

export default function BMRCalculatorPage() {
  return (
    <ProtectedRoute>
      <GetBMR />
    </ProtectedRoute>
  );
}