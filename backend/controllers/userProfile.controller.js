import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import ToolUsage from "../models/ToolUsage.js";
import Reward from "../models/Reward.js";
import Goal from "../models/Goal.js";
import UserPreferences from "../models/UserPreferences.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-passwordHash");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Progress data
  const habitsCompleted = await Habit.countDocuments({
    userId: user._id,
    completed: true,
  });
  const totalRewards = await Reward.countDocuments({ userId: user._id });
  const toolUsageCount = await ToolUsage.countDocuments({ userId: user._id });

  // Goals data
  const totalGoals = await Goal.countDocuments({ userId: user._id });
  const completedGoals = await Goal.countDocuments({
    userId: user._id,
    completed: true,
  });

  // Habits per day for last 7days
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const habitsPerDay = await Promise.all(
    last7Days.map(async (date) => {
      const nextDay = new Date(date);
      nextDay.setDate(database.getDate() + 1);
      const count = await Habit.countDocuments({
        userId: user._id,
        completed: true,
        completedAt: { $gte: date, $lt: nextDay },
      });
      return { date, count };
    }),
  );
  res.json({
    id: user._id,
    username: user.username,
    fullname: user.fullname,
    email: user.email,
    streak: user.streak,
    lastLoginDate: user.lastLoginDate,
    habitsCompleted,
    totalRewards,
    toolUsageCount,
    totalGoals,
    completedGoals,
    habitsPerDay,
    preferences: preferences || {},
  });
});
