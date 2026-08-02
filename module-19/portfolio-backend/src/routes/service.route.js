import express from "express";
import Router from "express";
import { validation } from "../middlewares/auth.middlewares.js";
import upload from "../configs/multer.config.js";
import serviceController from "../controllers/services.controller.js";

const router = express.Router();

//service route start

router.post(
  "/createService",
  validation,
  upload.single("img"),
  serviceController.createService,
);
router.get("/getAllService", validation, serviceController.getAllServices);
router.get(
  "/getSingleService/:id",
  validation,
  serviceController.getSingleService,
);
router.put(
  "/updateService/:id",
  validation,
  upload.single("img"),
  serviceController.updateService,
);
router.delete(
  "/Service_delete/:id",
  validation,
  serviceController.deleteService,
);
export default router;
