import { create } from "zustand";
import { Category } from "@/types/category";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/api/categoryApi";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  fetchCategories: () => Promise<void>;
  createCategory: (data: Partial<Category>) => Promise<void>;
  updateCategory: (id: string, data: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const categories = await fetchCategories();
      set({ categories });
    } finally {
      set({ loading: false });
    }
  },

  createCategory: async (data) => {
    set({ loading: true });
    try {
      await createCategory(data);
      await useCategoryStore.getState().fetchCategories();
    } finally {
      set({ loading: false });
    }
  },

  updateCategory: async (id, data) => {
    set({ loading: true });
    try {
      await updateCategory(id, data);
      await useCategoryStore.getState().fetchCategories();
    } finally {
      set({ loading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ loading: true });
    try {
      await deleteCategory(id);
      await useCategoryStore.getState().fetchCategories();
    } finally {
      set({ loading: false });
    }
  },
}));