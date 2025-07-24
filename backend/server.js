import express from "express";
import env from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import habitRoutes from "./routes/habit.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import chatMessageRoutes from "./routes/chatMessage.routes.js";
import toolUsageRoutes from "./routes/toolUsage.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import rewardRoutes from "./routes/reward.routes.js";
import userPreferencesRoutes from "./routes/userPreferences.routes.js";
import toolRoutes from "./routes/tool.routes.js";
import cors from "cors"

env.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
connectDB();

// Auth Routes
app.use("/api/auth", authRoutes);
// Habit Routes
app.use("/api/habits", habitRoutes);
// Goal Routes
app.use("/api/goals", goalRoutes);
// Progress Routes
app.use("/api/progress", progressRoutes);
// ChatMessages Routes
app.use("/api/chat", chatMessageRoutes);
// ToolUsage Route
app.use("/api/tool-usage", toolUsageRoutes);
// Notification Routes
app.use("/api/notification", notificationRoutes);
// Category Routes
app.use("/api/categories", categoryRoutes);
// Reward Routes
app.use("/api/rewards", rewardRoutes);
// Userpreferences Routes
app.use("/api/user-preferences", userPreferencesRoutes);
// Tools routes
app.use("/api/tools", toolRoutes);

app.get("/", (req, res) => {
  res.send("Server is started");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
