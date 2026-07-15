import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const connectDB = async () => {
  try {
    // Global Mongoose configuration
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ Mongoose connected: ${conn.connection.host}`);
    console.log(`📂 Database: ${conn.connection.name}`);
    console.log(
      `🔗 Connection State: ${
        conn.connection.readyState === 1 ? "Connected" : "Disconnected"
      }`,
    );
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
