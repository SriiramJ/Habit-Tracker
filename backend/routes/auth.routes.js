import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser
} from "../controllers/auth.controller.js";

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to log in a user
router.post("/login", loginUser);

// Route to generate a forgot password token
router.post("/forgot-password", forgotPassword);

// Router to reset the password
router.post("/reset-password", resetPassword);

// Router to logout
router.post("/logout",logoutUser)
export default router;
