import { useState } from "react";
import { calculateBMI } from "@/api/toolApi";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";

export default function BMICalculator(){
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [result, setResult] = useState<{bmi: number; category: string} | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null> (null)

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()
        setError(null)
        setResult(null)
        setLoading(true)

        try {
            const data = await calculateBMI(Number(weight), Number(height))
            setResult(data)
        } catch (err: any) {
            setError(err?.message || "Failed to calculate BMI")
        }
    }

    return(
        <Card className="max-w-md mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600">BMI Calculator</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Weight (kg)</label>
                    <input type="number" 
                    value={weight}
                    onChange={e=> setWeight(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                    required
                    min={1}
                    />
                </div>
                <div>
          <label className="block mb-1 font-medium">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={e => setHeight(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
            required
            min={1}
          />
        </div>
        <Button type="submit" variant="default" size="md" disabled={loading}>
            {loading ? "Calculating..." : "Calculate BMI"}
        </Button>
            </form>
             {error && <div className="mt-4 text-red-600">{error}</div>}
      {result && (
        <div className="mt-4 text-center">
          <div className="text-lg font-bold">BMI: {result.bmi}</div>
          <div className="text-md text-blue-600">{result.category}</div>
        </div>
      )}
        </Card>
    )
}