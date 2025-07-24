import { useState } from "react";
import { calculateIdealWeight } from "@/api/toolApi";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";

export default function GetIdealWeight(){
    const [height, setHeight] = useState("")
    const [gender, setGender] = useState("male")
    const [result, setResult] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null> (null)

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        setResult(null)
        setError(null)
        try {
            const data = await calculateIdealWeight(Number(height), gender)
            setResult(data.idealWeight)
        } catch (err:any) {
            setError(err?.message || "Failed to calculate ideal weight")
        }
        setLoading(false)
    }
     return (
    <Card className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Ideal Weight Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <Button type="submit" variant="default" size="md" disabled={loading}>
          {loading ? "Calculating..." : "Calculate Ideal Weight"}
        </Button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {result !== null && (
        <div className="mt-4 text-center">
          <div className="text-lg font-bold">Ideal Weight: {result} kg</div>
        </div>
      )}
    </Card>
  );
}