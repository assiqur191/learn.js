import express from "express";
import dashboardController from "../controllers/dashboard.controller.js";
import { validation } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", dashboardController.getDashboard);

router.get("/my", validation, dashboardController.getMyDashboard);

router.get("/recent", dashboardController.getRecentDashboard);

export default router;
