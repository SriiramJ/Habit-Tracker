import Category from "../models/Category.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateCategory } from "../utils/validators.js";

// Create a new category
export const createCategory = asyncHandler(async (req, res) => {
  const error = validateCategory(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { name, description, habitIds, goalIds } = req.body;
  const category = await Category.create({
    name,
    description,
    habitIds,
    goalIds,
  });
  res.status(201).json({
    message: "Category created successfully",
    category,
  });
});

// Get all categories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({
    message: "Categories retrieved succeessfully",
    categories,
  });
});

// Get a single category by ID
export const getCategoryById = asyncHandler(async () => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json({
    message: "Category retrieved successfully",
    category,
  });
});

// Update a category
export const updateCategory = asyncHandler(async (req, res) => {
  const error = validateCategory(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json({
    message: "Category updated successfully",
    category,
  });
});

// Delete a category
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json({
    message: "Category deleted successfully",
  });
});
