import { create } from "zustand";
import { Goal } from "../types/goal";
import {
  fetchGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "@/api/goalApi";

interface GoalState {
  goals: Goal[];
  loading: boolean;
  fetchGoals: () => Promise<void>;
  createGoal: (data: Partial<Goal>) => Promise<void>;
  updateGoal: (id: string, data: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
}

export const useGoalStore = create<GoalState>((set) => ({
  goals: [],
  loading: false,

  fetchGoals: async () => {
    set({ loading: true });
    try {
      const goals = await fetchGoals();
      set({ goals });
    } finally {
      set({ loading: false });
    }
  },

  createGoal: async (data) => {
    set({ loading: true });
    try {
      await createGoal(data);
      await useGoalStore.getState().fetchGoals();
    } finally {
      set({ loading: false });
    }
  },

  updateGoal: async (id, data) => {
    set({ loading: true });
    try {
      await updateGoal(id, data);
      await useGoalStore.getState().fetchGoals();
    } finally {
      set({ loading: false });
    }
  },

  deleteGoal: async (id) => {
    set({ loading: true });
    try {
      await deleteGoal(id);
      await useGoalStore.getState().fetchGoals();
    } finally {
      set({ loading: false });
    }
  },
}));