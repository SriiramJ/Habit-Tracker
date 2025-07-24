import api from "@/utils/api";
import { Reward } from "@/types/reward";

export async function fetchRewards(): Promise<Reward[]> {
  const res = await api.get("/rewards");
  return res.data;
}

export async function claimReward(id: string): Promise<void> {
  await api.post(`/rewards/${id}/claim`);
}