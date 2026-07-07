const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8ecusds.mongodb.net/?appName=Cluster0`;
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Mongodb connection failed", error.massage);
    process.exit(1);
  }
};
module.exports = connectDB;
