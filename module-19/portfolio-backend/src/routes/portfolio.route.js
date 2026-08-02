import express from "express";
import upload from "../configs/multer.config.js";
import { validation } from "../middlewares/auth.middlewares.js";
import portfolioController from "../controllers/portfolio.controller.js";

const router = express.Router();

router.post(
  "/create",
  validation,
  upload.single("file"),
  portfolioController.createPortfolio,
);

router.get("/all", portfolioController.getAllPortfolio);

router.get("/single/:id", portfolioController.getSinglePortfolio);

router.put(
  "/update/:id",
  validation,
  upload.single("file"),
  portfolioController.updatePortfolio,
);

router.delete("/delete/:id", validation, portfolioController.deletePortfolio);

export default router;
