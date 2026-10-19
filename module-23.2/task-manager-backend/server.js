import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import cors from "cors";

import connectDB from "./src/configs/db.config.js";
import taskRouter from "./src/routes/task.route.js";
import authRouter from "./src/routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDB();

//route will use

app.use("/api/tasks", taskRouter);
app.use("/api/auth", authRouter);

//port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`
    server is running on ${port}`);
});
