import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./src/configs/database.config.js";
import authRouter from "./src/routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/api/user", authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on: ${port}`);
});
