import express from "express";
import userController from "../controllers/user.controller.js";
import { validation } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Register
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

// Logout
router.post("/logout", validation, userController.logout);

// Get All Users
router.get("/all", validation, userController.allUsers);

// Get Single User
router.get("/single/:id", validation, userController.singleUser);

// Update User
router.put("/update", validation, userController.updateUser);

// Delete User
router.delete("/delete", validation, userController.deleteUser);

export default router;
