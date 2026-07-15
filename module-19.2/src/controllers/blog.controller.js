import Blog from "../models/blog.model.js";
// import User from "./../../../module-19/portfolio-backend/src/models/user.model";

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).json({
        message: "Title and content are required",
      });

    const blog = await Blog.create({
      title,
      content,
      author: req.user._id,
    });
    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.status(200).json({
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//single blog
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email",
    );

    if (!blog)
      return res.status(404).json({
        message: "Blog not found",
      });
    res.status(200).json({
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({
        message: "Blog not found",
      });
    if (blog.author.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "You are not authorized",
      });
    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog)
      return res.status(404).json({
        message: "Blog not found",
      });

    // Owner check
    if (blog.author.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "You are not authorized",
      });

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog deleted successfully",
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
