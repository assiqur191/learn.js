import express from "express";
import Router from "express";
import blogController from "../controllers/blog.controller.js";
import upload from "../configs/multer.config.js";
import { validation } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post(
  "/create_post",
  validation,
  upload.single("img"),
  blogController.createBlog,
);
router.get("/get_all_blogs", validation, blogController.getAllBlogs);
router.get("/single-blog/:id", validation, blogController.getSingleBlog);
router.put(
  "/update-blog/:id",
  validation,
  upload.single("img"),
  blogController.updateBlog,
);
router.delete("/delete-blog/:id", validation, blogController.deleteBlog);
// router.get("/get_all_blogs", blogController.getAllBlogs);

export default router;
