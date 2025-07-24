import express from "express";
import {
  sendPushNotification,
  sendEmailNotification,
} from "../controllers/notification.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/push", verifyUser, sendPushNotification);
router.post("/email", sendEmailNotification);

export default router;
