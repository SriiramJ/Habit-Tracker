import { useEffect } from "react";
import { useProgressStore } from "@/store/progressStore";
import { Progress } from "@/types/progress";

// Custom hook to manage progress state and actions

export function useProgress(){
    const {
        progresses,
        loading,
        fetchProgresses,
        createProgress,
        updateProgress,
        deleteProgress
    } = useProgressStore()

    useEffect(()=>{
        fetchProgresses()
    },[])
    return{
        progresses,
        loading,
        fetchProgresses,
        createProgress,
        updateProgress,
        deleteProgress
    }
}