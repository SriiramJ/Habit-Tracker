import express from "express";
import {
  getUserPreferences,
  updateUserPreferences,
} from "../controllers/userPreferences.controller.js";
import { getUserProfile } from "../controllers/userProfile.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyUser, getUserPreferences);
router.put("/", verifyUser, updateUserPreferences);
router.get("/me", verifyUser, getUserProfile);
export default router;
