import api from "@/utils/api";
import { Habit } from "@/types/habit";

export async function fetchHabits(): Promise<Habit[]> {
  const res = await api.get("/habits");
  return res.data;
}

export async function createHabit(data: Partial<Habit>): Promise<Habit> {
  const res = await api.post("/habits", data);
  return res.data;
}

export async function updateHabit(id: string, data: Partial<Habit>): Promise<Habit> {
  const res = await api.put(`/habits/${id}`, data);
  return res.data;
}

export async function deleteHabit(id: string): Promise<void> {
  await api.delete(`/habits/${id}`);
}

export async function fetchHabitById(id:string):Promise<Habit>{
  const res = await api.get(`/habits/${id}`)
  return res.data
}