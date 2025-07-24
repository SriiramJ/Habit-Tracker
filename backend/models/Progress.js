import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit" },
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: "Goal" },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  completionRate: { type: Number },
  isStreakMaintained: { type: Boolean, default: false },
  consecutiveDays: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Progress", progressSchema);
