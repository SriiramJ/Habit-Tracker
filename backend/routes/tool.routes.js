import express from "express";
import {
  getBMI,
  getBMR,
  getDailyCalories,
  getIdealWeight,
  startStopwatch,
  stopStopwatch,
  startTimer,
  checkTimer,
} from "../controllers/tool.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/bmi", verifyUser, getBMI);
router.post("/bmr", verifyUser, getBMR);
router.post("/dailycalories", verifyUser, getDailyCalories);
router.post("/idealweight", verifyUser, getIdealWeight);
router.post("/stopwatch/start", verifyUser, startStopwatch);
router.post("/stopwatch/stop", verifyUser, stopStopwatch);
router.post("/timer/start", verifyUser, startTimer);
router.get("/timer/check", verifyUser, checkTimer);

export default router;
