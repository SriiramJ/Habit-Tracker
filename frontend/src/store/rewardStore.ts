import { create } from "zustand";
import { Reward } from "@/types/reward";
import {
  fetchRewards,
  claimReward,
} from "@/api/rewardApi";

interface RewardState {
  rewards: Reward[];
  loading: boolean;
  fetchRewards: () => Promise<void>;
  claimReward: (id: string) => Promise<void>;
}

export const useRewardStore = create<RewardState>((set) => ({
  rewards: [],
  loading: false,

  fetchRewards: async () => {
    set({ loading: true });
    try {
      const rewards = await fetchRewards();
      set({ rewards });
    } finally {
      set({ loading: false });
    }
  },

  claimReward: async (id) => {
    set({ loading: true });
    try {
      await claimReward(id);
      await useRewardStore.getState().fetchRewards();
    } finally {
      set({ loading: false });
    }
  },
}));