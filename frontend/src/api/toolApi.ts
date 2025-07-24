import api from "@/utils/api"

export async function calculateBMI(weight: number, height: number){
    const res = await api.post("/tools/bmi",{weight, height})
    return res.data
}

export async function calculateBMR(weight: number, height: number, age: number, gender: string){
    const res = await api.post("/tools/bmr", {weight, height,age, gender})
    return res.data
}

export async function calculateDailyCalories(bmr: number, activityLevel: string){
    const res = await api.post("/tools/dailycalories", {bmr, activityLevel})
    return res.data
}

export async function calculateIdealWeight(height: number, gender: string){
    const res = await api.post("/tools/idealweight", {height, gender})
    return res.data
}

export async function startStopwatch(){
    const res = await api.post("/tools/stopwatch/start")
    return res.data
}
export async function stopStopwatch(){
    const res = await api.post("/tools/stopwatch/stop")
    return res.data
}

export async function startTimer(duration: number){
    const res = await api.post("/tools/timer/start",{duration})
    return res.data
}

export async function checkTimer(){
    const res = await api.get("/tools/timer/check")
    return res.data
}