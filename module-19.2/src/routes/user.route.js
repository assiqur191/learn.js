import express from "express";
import userController from "../controllers/user.controller.js";
// import auth from "../middlewares/auth.middleware.js";
import { auth } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// User
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);
router.get("/profile", auth, userController.getProfile);

export default router;
