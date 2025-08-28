import mongoose from "mongoose";
import { CONFIG } from "../constants/config";

const connectDB = async (): Promise<void> => {
  try { 
    const conn = await mongoose.connect(CONFIG.mongodbUrl);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
