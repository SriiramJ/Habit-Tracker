import api from "@/utils/api";
import { Progress } from "@/types/progress";

export async function fetchProgresses(): Promise<Progress[]> {
  const res = await api.get("/progress");
  return res.data;
}

export async function createProgress(data: Partial<Progress>): Promise<Progress> {
  const res = await api.post("/progress", data);
  return res.data;
}

export async function updateProgress(id: string, data: Partial<Progress>): Promise<Progress> {
  const res = await api.put(`/progress/${id}`, data);
  return res.data;
}

export async function deleteProgress(id: string): Promise<void> {
  await api.delete(`/progress/${id}`);
}