import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./src/configs/database.config.js";
import authRouter from "./src/routes/auth.route.js";
import blogRouter from "./src/routes/blog.route.js";
import fileRouter from "./src/routes/file.route.js";
import errorHandler from "./src/middlewares/error.middleware.js";
import serviceRouter from "./src/routes/service.route.js";
import portfolioRouter from "./src/routes/portfolio.route.js";
import commentRoute from "./src/routes/comment.route.js";
import testimonialRouter from "./src/routes/testimonial.route.js";
import educationRouter from "./src/routes/education.route.js";
import experienceRouter from "./src/routes/experience.route.js";
import advantageRouter from "./src/routes/advantage.route.js";
import dashboardRouter from "./src/routes/dashboard.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/api/users", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/file", fileRouter);
app.use("/api/service", serviceRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/comments", commentRoute);
app.use("/api/testimonial", testimonialRouter);
app.use("/api/education", educationRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/advantage", advantageRouter);
app.use("/api/dashboard", dashboardRouter);

//Golobal error Handaler
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
