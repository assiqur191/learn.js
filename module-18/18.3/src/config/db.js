import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Mongoose Connect successfully");
};

export default connectDB;
