import express from "express";
import upload from "../configs/multer.config.js";
import { validation } from "../middlewares/auth.middlewares.js";
import testimonialController from "../controllers/testimonial.controller.js";

const router = express.Router();

router.post(
  "/create",
  validation,
  upload.single("file"),
  testimonialController.createTestimonial,
);

router.get("/all", testimonialController.getAllTestimonials);

router.get("/single/:id", testimonialController.getSingleTestimonial);

router.put(
  "/update/:id",
  validation,
  upload.single("file"),
  testimonialController.updateTestimonial,
);

router.delete(
  "/delete/:id",
  validation,
  testimonialController.deleteTestimonial,
);
router.get(
  "/all-testimonial/user/:id",
  testimonialController.testimonialByuser,
);

export default router;
