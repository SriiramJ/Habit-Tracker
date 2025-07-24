import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDb connected: ${connect.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
