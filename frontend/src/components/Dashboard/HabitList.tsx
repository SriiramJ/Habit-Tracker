import { useHabits } from "@/hooks/useHabits";
import { Card } from "../ui/Card";
import { FlameIcon } from "lucide-react";

export default function HabitList(){
    const {habits, loading} = useHabits()

    return(
        <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FlameIcon className="text-orange-500 w-5 h-5"/> Habits
            </h3>
            {loading ? (
                <div>Loading habits...</div>
            ):habits.length === 0 ?(
                <div className="text-gray-500">No habits found.</div>
            ):(
                <div className="grid gap-4">
                    {habits.map((habit)=>(
                        <Card key={habit._id}>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold">{habit.title}</span>
                                <span className="text-sm text-gray-500">{habit.description}</span>
                                <span className="text-xs text-gray-400">{habit.categoryIds?.length ? `Categories: ${habit.categoryIds.join(", ")}`:""}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    )
}