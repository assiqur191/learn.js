import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./src/configs/database.config.js";
import "./src/configs/env.config.js";

import userRouter from "./src/routes/user.route.js";
import blogRouter from "./src/routes/blog.route.js";
import commentRouter from "./src/routes/comment.route.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Blog API is running...",
  });
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
