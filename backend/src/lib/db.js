import mongoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(ENV.DB_URL);
    console.log("Connected to MongoDB:", connected.connection.host);
  } catch (error) {
    (console, error("Error connecting DB", error));
    process.exit(1); // 1 means failure, 0 means success;
  }
};

export { connectDB };
