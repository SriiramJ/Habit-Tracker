import ProtectedRoute from "@/components/layout/ProtectedRoute";
import HabitList from "@/components/Dashboard/HabitList";

export default function HabitsPage(){
    return(
        <ProtectedRoute>
            <div className="max-w-2xl mx-auto mt-8">
                <HabitList/>
            </div>
        </ProtectedRoute>
    )
}