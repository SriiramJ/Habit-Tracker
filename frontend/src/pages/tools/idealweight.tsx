import ProtectedRoute from "@/components/layout/ProtectedRoute";
import GetIdealWeight from "@/components/Tools/IdealWeight";

export default function IdealWeightPage() {
  return (
    <ProtectedRoute>
      <GetIdealWeight />
    </ProtectedRoute>
  );
}