import cloudinary from "../configs/coudinary.config.js";
import Blog from "../models/blog.model.js";
import asyncHandler from "express-async-handler";

const createBlog = async (req, res) => {
  try {
    const { title, category, shortDescription, description } = JSON.parse(
      req.body.data,
    );
    console.log(req.file);
    const img = req.file.path;

    const public_id = req.file.filename;

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const result = await Blog.create({
      title,
      category,
      shortDescription,
      description,
      img,
      public_id,
    });
    res.status(201).json({
      success: true,
      message: "Blog create successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) return res.status(404).json({ message: "There is no Blogs" });
    res.status(200).json({
      success: true,
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const getSingleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  try {
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// const deleteBlog = async (req, res) => {};
const updateBlog = async (req, res) => {
  try {
    // const { title, category, img, description, shortDescription } = req.body;
    // const blog = await Blog.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     title,
    //     category,
    //     img,
    //     description,
    //     shortDescription,
    //   },
    //   {
    //     new: true,
    //     runValidators: true,
    //   },
    // );
    // if (!blog) return res.status(401).json({ message: "Blog not found" });
    // res.status(200).json({
    //   success: true,
    //   message: "Blog Updated successfully",
    //   blog: blog,
    // });

    /////////////////////////////////

    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({
        message: "Blog not found",
      });

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
    // if (!req.file) {
    //   return res.status(400).json({
    //     message: "Image is required",
    //   });
    // }

    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new Error("Blog not found");
  }

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: "Deleted successfully",
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
