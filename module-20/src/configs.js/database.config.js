import mongoose from "mongoose";
import dotenv from "dotenv";

import dns from "dns";

dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`Mongoose conneted on: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    console.log(`Connection status: ${conn.connection.readyState}`);
  } catch (error) {
    console.error(`ErrorDB:${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
