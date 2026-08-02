import asyncHandler from "express-async-handler";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

// Create Comment
export const createComment = asyncHandler(async (req, res) => {
  const { commentText } = req.body;
  const { blogId } = req.params;

  if (!commentText) {
    return res.status(400).json({
      success: false,
      message: "Comment text is required",
    });
  }

  const blog = await Blog.findById(blogId);

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

  const comment = await Comment.create({
    commentText,
    user: user._id,
    blog: blog._id,
  });

  res.status(201).json({
    success: true,
    message: "Comment created successfully",
    data: comment,
  });
});

// Get All Comments
export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
    .populate("user", "email")
    .populate("blog", "title")
    .sort({ createdAt: -1 });

  if (comments.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No comments found",
    });
  }

  res.status(200).json({
    success: true,
    data: comments,
  });
});

// Get Single Comment
export const getSingleComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)
    .populate("user", "email")
    .populate("blog", "title");

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
    });
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// Get Comments By Blog
export const getCommentsByBlog = asyncHandler(async (req, res) => {
  const comments = await Comment.find({
    blog: req.params.blogId,
  })
    .populate("user", "email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: comments,
  });
});

// Update Comment
export const updateComment = asyncHandler(async (req, res) => {
  const { commentText } = req.body;

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
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

  if (comment.user.toString() !== user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  comment.commentText = commentText;

  await comment.save();

  res.status(200).json({
    success: true,
    message: "Comment updated successfully",
    data: comment,
  });
});

// Delete Comment
export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
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

  if (comment.user.toString() !== user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  await comment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
});

const commentController = {
  createComment,
  getAllComments,
  getSingleComment,
  getCommentsByBlog,
  updateComment,
  deleteComment,
};

export default commentController;
