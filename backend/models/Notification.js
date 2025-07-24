import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  type: { type: String },
  priority: { type: String },
  actionRequired: { type: Boolean, default: false },
  sentAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

export default mongoose.model("Notification", notificationSchema);
