import { useEffect } from "react";
import { useHabitStore } from "@/store/habitStore";
import { Habit } from "@/types/habit";

// Custom hook to manage habits state and actions
export function useHabits(){
    const {
        habits,
        loading,
        fetchHabits,
        createHabit,
        updateHabit,
        deleteHabit,
    } = useHabitStore()

    // Fetch habits on mount
    useEffect(()=>{
        fetchHabits()
    },[])

    return{
        habits,
        loading,
        fetchHabits,
        createHabit,
        updateHabit,
        deleteHabit
    }
}