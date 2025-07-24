import mongoose from "mongoose";

const toolUsageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  toolName: { type: String, required: true },
  input: { type: mongoose.Schema.Types.Mixed },
  result: { type: mongoose.Schema.Types.Mixed },
  usedAt: { type: Date, default: Date.now },
});

export default mongoose.model("ToolUsage", toolUsageSchema);
