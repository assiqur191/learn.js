import express from "express";

import userControllers from "../controllers/users.controller.js";
import { validation } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.post("/logOut", userControllers.logOut);
router.get("/me", validation, userControllers.getMe);

export default router;
