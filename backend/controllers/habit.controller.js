import Habit from "../models/Habit.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateHabit } from "../utils/validators.js";

// Create a new habit
export const createHabit = asyncHandler(async (req, res) => {
  const error = validateHabit(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const {
    title,
    description,
    categoryIds,
    difficulty,
    status,
    startDate,
    reminderTime,
  } = req.body;

  const habit = await Habit.create({
    userId: req.user._id,
    title,
    description,
    categoryIds,
    difficulty,
    status,
    startDate,
    reminderTime,
  });

  res.status(201).json({
    message: "Habit created successfully",
    habit,
  });
});

// Get all habits for the logged-in User
export const getHabits = asyncHandler(async (req, res) => {
  const habits = await Habit.find({ userId: req.user._id });

  res.status(200).json({
    message: "Habits retrived successfully",
    habits,
  });
});

// Get a single habit by Id
export const getHabitById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const habit = await Habit.findOne({ _id: id, userId: req.user._id });

  if (!habit) {
    res.status(404);
    throw new Error("Habit not found");
  }
  res.status(200).json({
    message: "Habit retrieved successfully",
    habit,
  });
});

// Update a habit
export const updateHabit = asyncHandler(async (req, res) => {
  const error = validateHabit(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { id } = req.params;

  const habit = await Habit.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true },
  );
  if (!habit) {
    res.status(404);
    throw new Error("Habit not found");
  }
  res.status(200).json({
    message: "Habit updated successfully",
    habit,
  });
});

// Delete a habit
export const deleteHabit = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const habit = await Habit.findOneAndDelete({ _id: id, userId: req.user._id });

  if (!habit) {
    res.status(404);
    throw new Error("Habit not found");
  }
  res.status(200).json({
    message: "Habit deleted successfully",
  });
});
