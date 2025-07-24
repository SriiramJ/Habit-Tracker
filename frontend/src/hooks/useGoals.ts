import { useEffect } from "react";
import { useGoalStore } from "@/store/goalStore";
import { Goal } from "@/types/goal";

// Custom hook to manage goals state and actions
export function useGoals(){
    const {
        goals,
        loading,
        fetchGoals,
        createGoal,
        updateGoal,
        deleteGoal
    } = useGoalStore()
    // Fetch goals on mount
    useEffect(()=>{
        fetchGoals()
    },[])
    return{
        goals,
        loading,
        createGoal,
        updateGoal,
        deleteGoal
    }
}