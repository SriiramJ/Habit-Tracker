import express from "express";
import {
  createProgress,
  getProgresses,
  getProgressById,
  updateProgress,
  deleteProgress,
} from "../controllers/progress.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyUser, createProgress);
router.get("/", verifyUser, getProgresses);
router.get("/:id", verifyUser, getProgressById);
router.put("/:id", verifyUser, updateProgress);
router.delete("/:id", verifyUser, deleteProgress);

export default router;
