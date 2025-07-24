import Goal from "../models/Goal.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateGoal } from "../utils/validators.js";

// Create a new goal
export const createGoal = asyncHandler(async (req, res) => {
  const error = validateGoal(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { title, description, categoryIds, targetDate } = req.body;

  const goal = await Goal.create({
    userId: req.user._id,
    title,
    description,
    categoryIds,
    targetDate,
  });

  res.status(201).json({
    message: "Goal created successfully",
    goal,
  });
});

// Get all goals for the logged-in user
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ userId: req.user._id });
  res.status(200).json({
    message: "Goals retrieved successfully",
    goals,
  });
});

// Get a single goal by ID
export const getGoalById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findOne({ _id: id, userId: req.user._id });

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  res.status(200).json({
    message: "Goal retrieved successfully",
    goal,
  });
});

// Update a goal
export const updateGoal = asyncHandler(async (req, res) => {
  const error = validateGoal(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { id } = req.params;
  const goal = await Goal.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true },
  );

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  res.status(200).json({
    message: "Goal updated successfully",
    goal,
  });
});

// Delete a goal
export const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findOneAndDelete({ _id: id, userId: req.user._id });

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  res.status(200).json({
    message: "Goal deleted successfully",
  });
});
