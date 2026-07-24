import express from "express";
import Router from "express";
import blogController from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/create_post", blogController.createBlog);
router.get("/get_all_blogs", blogController.getAllBlogs);
router.get("/single-blog/:id", blogController.getSingleBlog);
router.put("/update-blog/:id", blogController.updateBlog);
router.delete("/delete-blog/:id", blogController.deleteBlog);
// router.get("/get_all_blogs", blogController.getAllBlogs);

export default router;
