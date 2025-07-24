import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "./../utils/asyncHandler.js";
import { generateToken } from "../utils/jwt.js";
import { validateUser } from "../utils/validators.js";
import logger from "../utils/logger.js";

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  // Validate input
  const error = validateUser(req.body);
  if (error) {
    logger.warn(`Validation failed for registration: ${error}`);
    res.status(400);
    throw new Error(error);
  }

  const { username, fullname, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.warn(
      `Registration failed - User with email ${email} already exists`,
    );
    res.status(400);
    throw new Error("User already exists with this email");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = await User.create({
    username,
    fullname,
    email,
    passwordHash: hashedPassword,
  });
  logger.info(`New user registered: ${email}`);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
});

// Login a user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    logger.warn("Login failed - Missing email or password");
    res.status(400);
    throw new Error("Email and password are required");
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    logger.warn(`Login failed - Invalid credentials for email: ${email}`);
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Update streak after successful login
  await updateLoginStreak(user);

  // Generate a JWT token
  const token = generateToken(user._id);
  logger.info(`User logged in: ${email}`);
  res
  .cookie("JwtToken", token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000,
  })
  .status(200).json({
    message: "Login Successful",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

// Forgot password - Generate reset token
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    logger.warn("Forgot password failed - Missing email");
    res.status(400);
    throw new Error("Email is required");
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    logger.warn(`Forgot password failed - No user found with email: ${email}`);
    res.status(404);
    throw new Error("User not found with this email");
  }

  // Generate a reset token and expiry
  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
  user.forgotPasswordToken = resetToken;
  user.forgotPasswordTokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();

  logger.info(`Password reset token generated for email: ${email}`);
  res.status(200).json({
    message: "Password reset token generated",
    resetToken,
  });
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    logger.warn("Reset password failed - Missing token or new password");
    res.status(400);
    throw new Error("Token and new password are required");
  }

  // Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find the user by ID and ensure the token is valid
  const user = await User.findOne({
    _id: decoded.id,
    forgotPasswordToken: token,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    logger.warn("Reset password failed - Invalid or expired token");
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update the user's password and clear the reset token
  user.passwordHash = hashedPassword;
  user.forgotPasswordToken = null;
  user.forgotPasswordTokenExpiry = null;
  await user.save();

  logger.info(`Password reset successful for email: ${user.email}`);
  res.status(200).json({
    message: "Password reset successfully",
  });
});

// Logout 
export const logoutUser = asyncHandler(async (res, req) => {
  res.clearCookie("JwtToken",{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict"
  })
  res.status(200).json({message: "Logged out successfully"})
})