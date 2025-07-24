import api from "@/utils/api";
import { Goal } from "@/types/goal";

export async function fetchGoals(): Promise<Goal[]> {
  const res = await api.get("/goals");
  return res.data;
}

export async function createGoal(data: Partial<Goal>): Promise<Goal> {
  const res = await api.post("/goals", data);
  return res.data;
}

export async function updateGoal(id: string, data: Partial<Goal>): Promise<Goal> {
  const res = await api.put(`/goals/${id}`, data);
  return res.data;
}

export async function deleteGoal(id: string): Promise<void> {
  await api.delete(`/goals/${id}`);
}

export async function fetchGoalById(id:string):Promise<Goal>{
  const res = await api.get(`/goals/${id}`)
  return res.data
}