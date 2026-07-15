import express from "express";
import blogController from "../controllers/blog.controller.js";
import { auth } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Blog
router.post("/", auth, blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getSingleBlog);
router.put("/:id", auth, blogController.updateBlog);
router.delete("/:id", auth, blogController.deleteBlog);

export default router;
