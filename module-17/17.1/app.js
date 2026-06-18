import express from "express";
import userRouter from "../17.1/routes/user.routes.js";

const app = express();

app.use(express.json());

// All routes

// app.get("/user", controller);
app.use("/api/17", userRouter);

//if routes not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    massage: "Router not found",
  });
});

export default app;
