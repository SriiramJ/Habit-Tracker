import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";
import { verifyClerkJWT } from "../utils/clerk.js";
import logger from "../utils/logger.js";
import { updateLoginStreak } from "../utils/streak.js";

// middleware to verify if the user is authenticated or not
export const verifyUser = asyncHandler(async (req, res, next) => {
  // extract token cookies or authorization header
  const token =
    req.cookies?.JwtToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    logger.error("No token provided");
    res.status(401);
    throw new Error("Unauthorized request: No token provided");
  }
  let user = null;
  try {
    // Try manual JWT first
    try {
      const decodeToken = verifyToken(token);
      user = await User.findById(decodeToken.id).select("-password");
      if (!user) throw new Error("User not found");
    } catch (manualErr) {
      // If manual Jwt fails, try clerk Jwt
      try {
        const clerkPayload = await verifyClerkJWT(token);
        // Find or create user in your DB based on clerk info
        user = await User.findOne({ email: clerkPayload.email });
        if (!user) {
          user = await User.create({
            email: clerkPayload.email,
            name: clerkPayload.name || clerkPayload.first_name,
            isVerified: true,
            authProvider: "clerk",
          });
        }
        // update sstreak for clerk login
        await updateLoginStreak(user);
      } catch (clerkErr) {
        logger.error("Invalid token for both manual and Clerk");
        res.status(401);
        throw new Error("Unauthorized request: Invalid token");
      }
    }
    req.user = user;
    next();
  } catch (error) {
    logger.error(error.message);
    res.status(401);
    throw new Error("Unauthorized request: Invalid token");
  }
});

// Middleware to verify forgot password token
export const verifyForgotPasswordToken = asyncHandler(
  async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
      res.status(400);
      throw new Error("Forgot password token is required");
    }
    try {
      // Find the user with the provided forgot password token
      const user = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
      });
      if (!user) {
        res.status(400);
        throw new Error("Invalid or expired forgot password token");
      }
      // Attach the user to the request object
      req.user = user;

      next();
    } catch (error) {
      res.status(400);
      throw new Error("Invalid or expired forgot password token");
    }
  },
);
