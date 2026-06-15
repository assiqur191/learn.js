import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());

//geting route and data from Controller
// router.post("/create-user", userController.createUser);
app.use("/api/user", userRouter);

//if there is no route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    massage: "Route not found",
  });
});
export default app;
