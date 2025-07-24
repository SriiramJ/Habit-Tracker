import ProtectedRoute from "@/components/layout/ProtectedRoute";
import BMICalculator from "@/components/Tools/BMICalculator";

export default function BMICalculatorPage() {
  return (
    <ProtectedRoute>
      <BMICalculator />
    </ProtectedRoute>
  );
}