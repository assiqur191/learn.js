import express from "express";
import { validation } from "../middlewares/auth.middlewares.js";
import experienceController from "../controllers/experience.controller.js";

const router = express.Router();

router.post("/create", validation, experienceController.createExperience);

router.get("/all", experienceController.getAllExperiences);

router.get("/my", validation, experienceController.getMyExperiences);

router.get("/single/:id", experienceController.getSingleExperience);

router.put("/update/:id", validation, experienceController.updateExperience);

router.delete("/delete/:id", validation, experienceController.deleteExperience);

export default router;
