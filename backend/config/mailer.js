import nodemailer from "nodemailer";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Log transporter creation success or failure
transporter.verify((error, success) => {
  if (error) {
    logger.error(`Nodemailer connection error: ${error.message}`);
  } else {
    logger.info("Nodemailer transporter is ready to send emails");
  }
});

export default transporter;
