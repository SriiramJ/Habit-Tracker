import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  habitIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habit" }],
  goalIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goal" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Category", categorySchema);
