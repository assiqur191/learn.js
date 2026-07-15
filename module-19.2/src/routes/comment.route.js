import express from "express";
import commentController from "../controllers/comment.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Comment
router.post("/blogs/:blogId/comments", auth, commentController.createComment);

router.get("/", commentController.getAllComments);

router.get("/:id", commentController.getSingleComment);

router.put("/:id", auth, commentController.updateComment);

router.delete("/:id", auth, commentController.deleteComment);

export default router;
