import { useEffect } from "react";
import { useRewardStore } from "@/store/rewardStore";
import { Reward } from "@/types/reward";

// Custom hook to manage rewards state and actions
export function useRewards() {
  const {
    rewards,
    loading,
    fetchRewards,
    claimReward,
  } = useRewardStore();

  useEffect(() => {
    fetchRewards();
    // eslint-disable-next-line
  }, []);

  return {
    rewards,
    loading,
    fetchRewards,
    claimReward,
  };
}