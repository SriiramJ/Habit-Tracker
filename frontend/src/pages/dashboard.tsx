import ProtectedRoute from "@/components/layout/ProtectedRoute";
import StreakDisplay from "@/components/Dashboard/StreakDisplay";
import HabitList from "@/components/Dashboard/HabitList";
import GoalList from "@/components/Dashboard/GoalList";
import ProgressChart from "@/components/Dashboard/ProgressChart";
import RewardList from "@/components/Dashboard/RewardList";
import NotificationList from "@/components/Dashboard/NotificationList";
import ToolsQuickAccess from "@/components/Dashboard/ToolsQuickAccess";


export default function DashboardPage(){
    return(
        <ProtectedRoute>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <StreakDisplay />
                    <HabitList />
                    <GoalList />
                    <ToolsQuickAccess />
                </div>
                <div className="space-y-8">
                    <ProgressChart />
                    <RewardList />
                    <NotificationList />
                </div>
            </div>
        </ProtectedRoute>
    )
}