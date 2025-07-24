import admin from "firebase-admin";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

const ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(ServiceAccount),
    });
    logger.info("Firebase Admin SDK initialized successfully.");
  }
} catch (error) {
  logger.error(`Firebase initialization error: ${error.message}`);
  process.exit(1);
}

export default admin;
