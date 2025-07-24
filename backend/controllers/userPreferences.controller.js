import UserPreferences from "../models/UserPreferences.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateUserPreferences } from "../utils/validators.js";

// Get user preferences for the logged-in user
export const getUserPreferences = asyncHandler(async (req, res) => {
  const prefs = await UserPreferences.findOne({ userId: req.user._id });
  if (!prefs) {
    return res.status(404).json({ message: "User preferences not found" });
  }
  res.status(200).json({ preferences: prefs });
});

// Update or create user preferences for the logged-in user
export const updateUserPreferences = asyncHandler(async (req, res) => {
  const error = validateUserPreferences(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }
  const prefs = await UserPreferences.findOneAndUpdate(
    { userId: req.user._id },
    req.body,
    { new: true, upsert: true, runValidators: true },
  );
  res.status(200).json({ message: "Preferences updated", preferences: prefs });
});
