import express from "express";
import {
  createHabit,
  getHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
} from "../controllers/habit.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for habits
router.post("/", verifyUser, createHabit);
router.get("/", verifyUser, getHabits);
router.get("/:id", verifyUser, getHabitById);
router.put("/:id", verifyUser, updateHabit);
router.delete("/:id", verifyUser, deleteHabit);

export default router;
