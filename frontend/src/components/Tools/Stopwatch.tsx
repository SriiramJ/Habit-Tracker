import { useState } from "react";
import { startStopwatch,stopStopwatch } from "@/api/toolApi";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";

export default function Stopwatch(){
    const [running, setRunning] = useState(false)
    const [elapsed, setElapsed] = useState<number |null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleStart = async()=>{
        setLoading(true)
        setError(null)
        try {
            await startStopwatch()
            setRunning(true)
            setElapsed(null)
        } catch (err: any) {
            setError(err?.message || "Failed to start stopwatch")
        }
        setLoading(false)
    }

    const handleStop = async()=>{
        setLoading(true)
        setError(null)
        try {
            const data = await stopStopwatch()
            setElapsed(data.elapsedSeconds)
        } catch (err:any) {
            setError(err?.message || "Failed to stop stopwatch")
        }
        setLoading(false)
    }

    return(
        <Card className="max-w-md mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Stopwatch</h2>
            <div className="flex flex-col gap-4 items-center">
                <Button
                variant="default"
                size="md"
                onClick={handleStart}
                disabled={loading || running}
                >Start</Button>
                 <Button
          variant="secondary"
          size="md"
          onClick={handleStop}
          disabled={loading || !running}
        >
          Stop
        </Button>
        {elapsed !== null &&(
            <div className="text-lg font-semibold mt-2">
                Elapsed: {elapsed} seconds
            </div>
        )}
        {error && <div className="text-red-600 mt-2">{error}</div>}
            </div>
        </Card>
    )
}