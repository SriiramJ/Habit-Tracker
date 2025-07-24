import React, { useState } from "react";
import { startTimer,checkTimer } from "@/api/toolApi";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";

export default function Timer(){
    const [duration, setDuration] = useState('')
    const [remaining, setRemaining] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [finished, setFinished] = useState(false)

    const handleStart = async(e: React.FormEvent)=>{
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            await startTimer(Number(duration))
            setRemaining(Number(duration))
            setFinished(false)
        } catch (err:any) {
            setError(err?.message || "Failed to start timer")
        }
        setLoading(false)
    }

    const handleCheck = async()=>{
        setLoading(true)
        setError(null)
        try {
            const data = await checkTimer()
            setRemaining(data.remainingSeconds)
            setFinished(data.finished)
        } catch (err: any) {
            setError(err?.message || "Failed to check timer")
        }
        setLoading(false)
    }

    return(
        <Card className="max-e-md mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Timer</h2>
            <form onSubmit={handleStart} className="flex gap-2 items-center mb-4">
                <input type="number"
                value={duration}
                onChange={e=> setDuration(e.target.value)}
                className="px-3 py-2 border rounded focus:ring focus:ring-blue-500"
                placeholder="Seconds"
                required
                min={1}
                />
                <Button type="submit" variant="default" size="md" disabled={loading}>Start Timer</Button>
            </form>
            <Button
            variant="secondary"
            size="md"
            onClick = {handleCheck}
            disabled = {loading || finished || !remaining}
            >Check Timer</Button>

            {remaining !== null &&(
                <div className="mt-4 text-lg font-semibold">
                    {finished ? "Timer finished" : `Time remaining: ${remaining} seconds`}
                </div>
            )}
           { error && <div className="text-red-600 mt-2">{error}</div>}
        </Card>
    )

}