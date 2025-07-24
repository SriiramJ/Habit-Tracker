import { useState } from "react";
import { calculateBMR } from "@/api/toolApi";
import {Card } from "../ui/Card";
import { Button } from "../ui/button";

export default function GetBMR(){
    const [form, setForm] = useState({height: "", weight: "", age:"",gender: "male"})
    const [result, setResult] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setForm({...form, [e.target.name]: e.target.value})
        setError(null)
    }

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const data = await calculateBMR(Number(form.height), Number(form.weight), Number(form.age), form.gender)
            setResult(data)
        } catch (err: any) {
            setError(err?.message || "Failed to calculate BMR")
        }
        setLoading(false)
    }
    return(
        <Card className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-600">BMR Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
            required
            min={1}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={form.height}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
            required
            min={1}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
            required
            min={1}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <Button type="submit" variant="default" size="md" disabled={loading}>
          {loading ? "Calculating..." : "Calculate BMR"}
        </Button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {result !== null && (
        <div className="mt-4 text-center">
          <div className="text-lg font-bold">BMR: {result} kcal/day</div>
        </div>
      )}
    </Card>
    )
}