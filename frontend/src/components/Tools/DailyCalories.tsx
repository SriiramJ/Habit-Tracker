import { useState } from "react";
import { calculateDailyCalories } from "@/api/toolApi";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";

const activityLevels = [
    {value: "sedentary", label: "Sedentary: little or no exercise"},
    {value: "lightlyActive", label: "Lightly Active: exercise 1-3 times/week"},
    {value: "moderatelyActive", label: "Moderately Active: exercise 4-5 times/week"},
    { value: "active", label: "Active (hard exercise/sports 6-7 days/week)" },
    {value: "veryActive", label: "Very Active: daily exercise or physical job"},
]

export default function GetDailyCalories(){
    const [bmr, setBmr] = useState("")
    const [activityLevel, setActivityLevel] = useState(activityLevels[0].value)
    const [result, setResult] = useState<number | null > (null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        setResult(null)
        setError(null)
        try {
            const data = await calculateDailyCalories(Number(bmr),activityLevel)
        } catch (err: any) {
            setError(err?.message || "Failed to calculate daily calories")
        }
        setLoading(false)
    }

    return(
        <Card className="max-w-md mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Daily Caloric Needs</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">BMR (kcal/day)</label>
          <input
            type="number"
            value={bmr}
            onChange={e => setBmr(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
            required
            min={1}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Activity Level</label>
          <select
            value={activityLevel}
            onChange={e => setActivityLevel(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
          >
            {activityLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="default" size="md" disabled={loading}>
          {loading ? "Calculating..." : "Calculate Calories"}
        </Button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {result !== null && (
        <div className="mt-4 text-center">
          <div className="text-lg font-bold">Daily Calories: {result} kcal</div>
        </div>
      )}
        </Card>
    )
}