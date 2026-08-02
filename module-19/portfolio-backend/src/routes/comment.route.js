import express from "express";
import { validation } from "../middlewares/auth.middlewares.js";
import commentController from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create/:blogId", validation, commentController.createComment);

router.get("/all", commentController.getAllComments);

router.get("/single/:id", commentController.getSingleComment);

router.get("/blog/:blogId", commentController.getCommentsByBlog);

router.put("/update/:id", validation, commentController.updateComment);

router.delete("/delete/:id", validation, commentController.deleteComment);

export default router;
