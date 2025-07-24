import mongoose from "mongoose";

const userPreferencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Notifications

  preferredReminders: { type: Boolean, default: true },
  notificationTypes: [{ type: String }], // e.g., ["email", "push"]
  reminderTimes: [{ type: String }], // e.g., ["08:00", "20:00"]
  notificationFrequency: { type: String }, // e.g., "daily", "weekly"

  // AI/Chatbot

  aiTone: { type: String, default: "motivational" }, // "friendly", "strict", etc.
  motivationFrequency: { type: String, default: "daily" },

  // Gamification

  showBadges: { type: Boolean, default: true },
  showLeaderboard: { type: Boolean, default: false },

  // Privacy

  profileVisibility: { type: String, default: "private" }, // "public", "private", "friends"
  shareProgress: { type: Boolean, default: false },

  // Theme & Accessibility

  themePreference: { type: String, default: "system" }, // "light", "dark", "system"
  fontSize: { type: String, default: "medium" },
  language: { type: String, default: "en" },

  // Tools

  favoriteTools: [{ type: String }],

  // Misc

  goalVisibility: { type: String },
  defaultTrackingMode: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("UserPreferences", userPreferencesSchema);
