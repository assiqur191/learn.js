import authController from "../controllers/auth.controller.js";
import bcrypt from "bcryptjs";
import express from "express";
// import { bcrypt } from "bcryptjs";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
