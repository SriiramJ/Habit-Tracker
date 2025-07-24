import { create } from "zustand";
import { Habit } from "@/types/habit";
import {
  fetchHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} from "@/api/habitApi";

interface HabitState {
  habits: Habit[];
  loading: boolean;
  fetchHabits: () => Promise<void>;
  createHabit: (data: Partial<Habit>) => Promise<void>;
  updateHabit: (id: string, data: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
}

export const useHabitStore = create<HabitState>((set) => ({
  habits: [],
  loading: false,

  fetchHabits: async () => {
    set({ loading: true });
    try {
      const habits = await fetchHabits();
      set({ habits });
    } finally {
      set({ loading: false });
    }
  },

  createHabit: async (data) => {
    set({ loading: true });
    try {
      await createHabit(data);
      await useHabitStore.getState().fetchHabits();
    } finally {
      set({ loading: false });
    }
  },

  updateHabit: async (id, data) => {
    set({ loading: true });
    try {
      await updateHabit(id, data);
      await useHabitStore.getState().fetchHabits();
    } finally {
      set({ loading: false });
    }
  },

  deleteHabit: async (id) => {
    set({ loading: true });
    try {
      await deleteHabit(id);
      await useHabitStore.getState().fetchHabits();
    } finally {
      set({ loading: false });
    }
  },
}));