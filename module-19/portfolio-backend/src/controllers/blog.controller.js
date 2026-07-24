import Blog from "../models/blog.model.js";

const createBlog = async (req, res) => {
  try {
    const blogData = req.body;
    const result = await Blog.create(blogData);
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
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  try {
    if (!blogs) return res.status(404).json({ message: "There is no Blogs" });
    res.status(200).json({
      success: true,
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  try {
    if (!blog) return res.status(401).json({ message: "Blog not found" });
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
    const { title, category, img, description, shortDescription } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        img,
        description,
        shortDescription,
      },
      { new: true },
      { runValidators: true },
    );
    if (!blog) return res.status(401).json({ message: "Blog not found" });
    res.status(200).json({
      success: true,
      message: "Blog Updated successfully",
      blog: blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  try {
    if (!blog) return res.status(401).json({ message: "Blog not found" });
    res.status(200).json({
      success: true,
      message: "Blog delete successfully",
      blog: blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const blogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};

export default blogController;
