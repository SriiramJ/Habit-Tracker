import express from "express";
import {
  createReward,
  getRewards,
  getRewardById,
  claimReward,
  // updateReward,
  // deleteReward,
} from "../controllers/reward.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyUser, createReward);
router.post("/:id/claim", verifyUser, claimReward);
router.get("/", verifyUser, getRewards);
router.get("/:id", verifyUser, getRewardById);
// router.put("/:id", verifyUser, updateReward);
// router.delete("/:id", verifyUser, deleteReward);

export default router;
