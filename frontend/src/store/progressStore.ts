import { create } from "zustand";
import { Progress } from "@/types/progress";
import {
  fetchProgresses,
  createProgress,
  updateProgress,
  deleteProgress,
} from "@/api/progressApi";

interface ProgressState {
  progresses: Progress[];
  loading: boolean;
  fetchProgresses: () => Promise<void>;
  createProgress: (data: Partial<Progress>) => Promise<void>;
  updateProgress: (id: string, data: Partial<Progress>) => Promise<void>;
  deleteProgress: (id: string) => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set) => ({
  progresses: [],
  loading: false,

  fetchProgresses: async () => {
    set({ loading: true });
    try {
      const progresses = await fetchProgresses();
      set({ progresses });
    } finally {
      set({ loading: false });
    }
  },

  createProgress: async (data) => {
    set({ loading: true });
    try {
      await createProgress(data);
      await useProgressStore.getState().fetchProgresses();
    } finally {
      set({ loading: false });
    }
  },

  updateProgress: async (id, data) => {
    set({ loading: true });
    try {
      await updateProgress(id, data);
      await useProgressStore.getState().fetchProgresses();
    } finally {
      set({ loading: false });
    }
  },

  deleteProgress: async (id) => {
    set({ loading: true });
    try {
      await deleteProgress(id);
      await useProgressStore.getState().fetchProgresses();
    } finally {
      set({ loading: false });
    }
  },
}));