import asyncHandler from "express-async-handler";
import cloudinary from "../configs/coudinary.config.js";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

// =============================
// Create Blog
// =============================
export const createBlog = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image is required",
    });
  }

  const { title, category, shortDescription, description } = JSON.parse(
    req.body.data,
  );

  const user = await User.findOne({
    email: req.headers.email,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const blog = await Blog.create({
    title,
    category,
    shortDescription,
    description,
    img: req.file.path,
    public_id: req.file.filename,
    author: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data: blog,
  });
});

// =============================
// Get All Blogs
// =============================
export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", "email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: blogs,
  });
});

// =============================
// Get Single Blog
// =============================
export const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author", "email");

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// =============================
// Update Blog
// =============================
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  const user = await User.findOne({
    email: req.headers.email,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Only author can update
  if (blog.author.toString() !== user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { title, category, shortDescription, description } = JSON.parse(
    req.body.data,
  );

  blog.title = title;
  blog.category = category;
  blog.shortDescription = shortDescription;
  blog.description = description;

  if (req.file) {
    await cloudinary.uploader.destroy(blog.public_id);

    blog.img = req.file.path;
    blog.public_id = req.file.filename;
  }

  await blog.save();

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    data: blog,
  });
});

// =============================
// Delete Blog
// =============================
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  const user = await User.findOne({
    email: req.headers.email,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Only author can delete
  if (blog.author.toString() !== user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  await cloudinary.uploader.destroy(blog.public_id);

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

const blogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};

export default blogController;
