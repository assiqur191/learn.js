import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import mongoose from "mongoose";

import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const connectDB = asyncHandler(async () => {
  const conn = await mongoose.connect(process.env.DB_URI);
  console.log(`Mongoose conneted on:${conn.connection.host}`);
  console.log(`Database name : ${conn.connection.name}`);
  console.log(`check connection : ${conn.connection.readyState}`);
});

export default connectDB;
