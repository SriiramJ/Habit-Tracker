import Progress from "../models/Progress.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateProgress } from "../utils/validators.js";

// Create a new progress entry
export const createProgress = asyncHandler(async (req, res) => {
  const error = validateProgress(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const {
    habitId,
    goalId,
    date,
    completed,
    completionRate,
    isStreakMaintained,
    consecutiveDays,
  } = req.body;

  const progress = await Progress.create({
    userId: req.user._id,
    habitId,
    goalId,
    date,
    completed,
    completionRate,
    isStreakMaintained,
    consecutiveDays,
  });

  res.status(201).json({
    message: "Progress created successfully",
    progress,
  });
});
// Get all progress entries for the logged-in user
export const getProgresses = asyncHandler(async (req, res) => {
  const progresses = await Progress.find({ userId: req.user._id });
  res.status(200).json({
    message: "Progress entries retrieved successfully",
    progresses,
  });
});

// Get a single progress entry by ID
export const getProgressById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const progress = await Progress.findOne({ _id: id, userId: req.user._id });

  if (!progress) {
    res.status(404);
    throw new Error("Progress entry not found");
  }
  res.status(200).json({
    message: "Progress entry retrieved successfully",
    progress,
  });
});

// Update a progress entry
export const updateProgress = asyncHandler(async (req, res) => {
  const error = validateProgress(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { id } = req.params;
  const progress = await Progress.findOneAndUpdate(
    {
      _id: id,
      userId: req.user._id,
    },
    req.body,
    { new: true, runValidators: true },
  );
  if (!progress) {
    res.status(404);
    throw new Error("Progress entry not found");
  }
  res.status(200).json({
    message: "Progress entry updated successfully",
  });
});

// Delete a progress entry
export const deleteProgress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const progress = await Progress.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });

  if (!progress) {
    res.status(404);
    throw new Error("Progress entry not found");
  }
  res.status(200).json({
    message: "Progress entry deleted successfully",
  });
});
