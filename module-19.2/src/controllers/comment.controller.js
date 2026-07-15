import Comment from "../models/Comment.model.js";
import Blog from "../models/blog.model.js";

// Create Comment
export const createComment = async (req, res) => {
  try {
    const { commentText } = req.body;
    const { blogId } = req.params;

    if (!commentText) {
      return res.status(400).json({
        message: "Comment is required",
      });
    }

    // Check if blog exists
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const comment = await Comment.create({
      commentText,
      user: req.user._id,
      blog: blogId,
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "name email")
      .populate("blog", "title");

    res.status(200).json({
      comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Comment
export const getSingleComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("user", "name email")
      .populate("blog", "title");

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    res.status(200).json({
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Comment
export const updateComment = async (req, res) => {
  try {
    const { commentText } = req.body;

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only comment owner can update
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    comment.commentText = commentText || comment.commentText;

    await comment.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only comment owner can delete
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const commentController = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
};

export default commentController;
