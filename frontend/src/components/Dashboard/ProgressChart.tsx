import { useProgress } from "@/hooks/useProgress";
import { Card } from "../ui/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts";
import { getDailyProgressChartData } from "@/utils/chart";

export default function ProgressChart(){
    const {progresses, loading} = useProgress()

    // Prepare chart data for the last 30 days
    const startDate = new Date(Date.now() - 30 *24*60*60*1000)
    .toISOString()
    .split("T")[0]
    const endDate = new Date().toISOString().split("T")[0]
    const chartData = getDailyProgressChartData(
        progresses.map((p)=> ({date:p.date, completed: p.completed})),
        startDate,
        endDate
    )
    const chartDataArray = chartData.labels.map((label,index)=>({
        date: label,
        completed: chartData.data[index]
    }))

    return(
        <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart width={24} height={24}/> Progress (Last 30 Days)
            </h3>
            <Card>
                {loading? (
                    <div>Loading progress...</div>
                ):(
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartDataArray}>
                            <XAxis dataKey="date" tick={{fontSize: 12}}/>
                            <YAxis allowDecimals={false}/>
                            <Tooltip/>
                            <Bar dataKey="completed" fill="#3b82f6"/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Card>
        </section>
    )
}