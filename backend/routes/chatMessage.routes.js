import express from "express";
import { createChatMessage } from "../controllers/chatMessage.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyUser, createChatMessage);

export default router;
