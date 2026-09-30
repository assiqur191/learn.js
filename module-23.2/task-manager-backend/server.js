import express from "express";
import dotenv from "dotenv";

import cors from "cors";

import connectDB from "./src/configs/db.config.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();

//route will use

app.get("/api/test", (req, res) => {
  res.json({
    message: "Task manager API is working",
  });
});

//port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`
    server is running on ${port}`);
});
