import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "../src/routes/auth.route.js";
import productRouter from "../src/routes/product.route.js";
import connectDB from "./config/db.js";
// import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on : ${[port]}`);
});
