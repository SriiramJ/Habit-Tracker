import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  points: { type: Number, default: 0 },
  rewardType: { type: String },
  earnedAt: {
    type: Date,
    default: Date.now,
  },
  claimedAt: { type: Date, default: null },
  expiryDate: { type: Date },
});

export default mongoose.model("Reward", rewardSchema);
