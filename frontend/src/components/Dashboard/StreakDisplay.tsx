import { useProgress } from "@/hooks/useProgress";
import { Card } from "../ui/Card";
import { FlameIcon } from "lucide-react";

export default function StreakDisplay(){
    const {progresses} = useProgress()

    const streak = progresses.reduce((acc,p)=>(p.isStreakMaintained ? acc + 1 : acc),0)

    return(
        <Card className="flex items-center gap-3">
            <FlameIcon className="text-orange-500 w-7 h-7"/>
            <div>
                <div className="text-lg font-bold text-orange-600">{streak} Day Streak</div>
                <div className="text-xs text-gray-500">Keep up the momentum!</div>
            </div>
        </Card>
    )
}