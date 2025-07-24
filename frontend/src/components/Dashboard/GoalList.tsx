import { useGoals } from "@/hooks/useGoals";
import { Card } from "../ui/Card";
import { TargetIcon } from "lucide-react";

export default function GoalList(){
    const {goals, loading} = useGoals()

    return(
        <section>
            <h3 className="text--xl font-bold mb-4 flex items-center gap-2">
                <TargetIcon  className="text-blue-500 w-5 h-5"/> Goals
            </h3>
            {loading ?(
                <div>Loadinf goals...</div>
            ): goals.length === 0 ?(
                <div className="text-gray-500">No goals found.</div>
            ):(
                <div className="grid gap-4">
                    {goals.map((goal)=>(
                        <Card key={goal._id}>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold">{goal.title}</span>
                                <span className="text-sm text-gray-500">{goal.description}</span>
                                <span className="text-xs text-gray-400">{goal.targetDate?`Target: ${goal.targetDate}`:""}</span>
                                <span className="text-xs text-green-600">{goal.isCompleted ? "completed" : "Active"}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    )
}