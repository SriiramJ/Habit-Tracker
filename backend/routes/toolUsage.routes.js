import express from "express";
import {
  createToolUsage,
  getToolUsages,
  getToolUsageById,
  deleteToolUsage,
} from "../controllers/toolUsage.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyUser, createToolUsage);
router.get("/", verifyUser, getToolUsages);
router.get("/:id", verifyUser, getToolUsageById);
router.delete("/:id", verifyUser, deleteToolUsage);

export default router;
