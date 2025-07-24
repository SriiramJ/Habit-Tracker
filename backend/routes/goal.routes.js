import express from "express";
import {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyUser, createGoal);
router.get("/", verifyUser, getGoals);
router.get("/:id", verifyUser, getGoalById);
router.put("/:id", verifyUser, updateGoal);
router.delete("/:id", verifyUser, deleteGoal);

export default router;
