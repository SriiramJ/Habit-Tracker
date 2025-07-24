import ChatMessage from "../models/ChatMessage.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateChatMessage } from "../utils/validators.js";
import { getAIResponse } from "../utils/aiService.js";

// Create a new chat message and get AI response
export const createChatMessage = asyncHandler(async (req, res) => {
  const error = validateChatMessage(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { role, intent, message } = req.body;

  // Store user message
  const userMsg = await ChatMessage.create({
    userId: req.user._id,
    role: role || "user",
    intent,
    message,
  });

  // Get AI response from Ollama
  const aiReply = await getAIResponse(message);

  // Store AI message
  const aiMsg = await ChatMessage.create({
    userId: req.user._id,
    role: "ai",
    intent: "motivation",
    message: aiReply,
  });

  res.status(201).json({
    message: "Chat and AI response created successfully",
    userMessage: userMsg,
    aiMessage: aiMsg,
  });
});
