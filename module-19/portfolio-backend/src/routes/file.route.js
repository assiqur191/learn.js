import express from "express";
import { validation } from "../middlewares/auth.middlewares.js";
import upload from "../configs/multer.config.js";
import fileController from "../controllers/file.controller.js";

const router = express.Router();

router.post(
  "/Upload_file",
  validation,
  upload.single("file"),
  fileController.uploadFile,
);
router.get("/all_file", validation, fileController.getAllFile);
router.delete("/delete_file/:id", validation, fileController.deleteFile);

export default router;
