import api from "@/utils/api";
import { Category } from "@/types/category";

export async function fetchCategories(): Promise<Category[]> {
  const res = await api.get("/categories");
  return res.data;
}

export async function createCategory(data: Partial<Category>): Promise<Category> {
  const res = await api.post("/categories", data);
  return res.data;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<Category> {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}

export async function fetchCategoryById(id:string):Promise<Category>{
  const res = await api.get(`/categories/${id}`)
  return res.data
}