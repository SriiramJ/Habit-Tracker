import ToolUsage from "../models/ToolUsage.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateToolUsage } from "../utils/validators.js";

// Create a new tool usage entry
export const createToolUsage = asyncHandler(async (req, res) => {
  const error = validateToolUsage(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { toolName, input, result } = req.body;

  const toolUsage = await ToolUsage.create({
    userId: req.user._id,
    toolName,
    input,
    result,
  });

  res.status(201).json({
    message: "Tool usage recorded successfully",
    toolUsage,
  });
});

// Get all tool usage entries for the logged-in user
export const getToolUsages = asyncHandler(async (req, res) => {
  const toolUsages = await ToolUsage.find({ userId: req.user._id });
  res.status(200).json({
    message: "Tool usages retrieved successfully",
    toolUsages,
  });
});

// Get a single tool usage entry by ID
export const getToolUsageById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const toolUsage = await ToolUsage.findOne({ _id: id, userId: req.user._id });

  if (!toolUsage) {
    res.status(404);
    throw new Error("Tool usage entry not found");
  }

  res.status(200).json({
    message: "Tool usage entry retrieved successfully",
    toolUsage,
  });
});

// Delete a tool usage entry
export const deleteToolUsage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const toolUsage = await ToolUsage.findOneAndDelete({
    _id: id,
    userId: req.user._id,
  });

  if (!toolUsage) {
    res.status(404);
    throw new Error("Tool usage entry not found");
  }

  res.status(200).json({
    message: "Tool usage entry deleted successfully",
  });
});
