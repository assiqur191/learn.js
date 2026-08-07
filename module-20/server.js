import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/configs.js/database.config.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.route.js";
import errorHandler from "./src/middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

//route
app.use("/api/users", userRouter);
//error route
app.use(errorHandler);

//POrt

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
