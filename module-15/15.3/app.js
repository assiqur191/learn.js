import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());

//-----> all route
// app.use('/api/user', ourRouts)

app.use("/api/user/", userRouter);

//------> if no routes found
app.use((req, res) => {
  res.status(401).json({
    success: false,
    massage: "Route not found",
  });
});

export default app;
