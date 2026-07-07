import express from "express";
import {
  forgetPassword,
  getProfile,
  login,
  register,
  resetPassword,
} from "../controllers/user.controllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.post("/forget-password", forgetPassword);
router.put("/reset-password/:resetToken", resetPassword);

export default router;
