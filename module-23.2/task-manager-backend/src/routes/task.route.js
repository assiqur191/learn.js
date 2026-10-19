import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../controllers/tasks.controller.js";
import { validation } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(validation); // Apply the validation middleware to all routes in this router

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTaskById);
router.delete("/:id", deleteTaskById);

export default router;
