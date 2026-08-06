import express from "express";
// import Router from "express";
import { validation } from "../middlewares/auth.middlewares.js";
import educationController from "../controllers/education.controller.js";

const router = express.Router();

router.post("/create", validation, educationController.createEducation);
router.get("/all", validation, educationController.getAllEducation);
router.get("/single/:id", validation, educationController.getSingleEducation);
router.put("/update/:id", validation, educationController.updateEducation);
router.delete("/delete/:id", validation, educationController.deleteEducation);
router.get("/user/educations", validation, educationController.educationByUser);

export default router;
