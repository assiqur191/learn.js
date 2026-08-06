import asyncHandler from "express-async-handler";

import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";
import Service from "../models/services.model.js";
import Portfolio from "../models/portfolio.model.js";
import Comment from "../models/comment.model.js";
import Testimonial from "../models/testimonial.model.js";
import Education from "../models/education.model.js";
import Experience from "../models/experience.model.js";
import Advantage from "../models/advantage.model.js";
import File from "../models/file.model.js";

//statistics
export const getDashboard = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalBlogs,
    totalSevices,
    totalPortfolio,
    totalComments,
    totalTestimonials,
    totalEducations,
    totalExperiences,
    totalAdvantages,
    totalFiles,
  ] = await Promise.all([
    User.countDocuments(),
    Blog.countDocuments(),
    Service.countDocuments(),
    Portfolio.countDocuments(),
    Comment.countDocuments(),
    Testimonial.countDocuments(),
    Education.countDocuments(),
    Experience.countDocuments(),
    Advantage.countDocuments(),
    File.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalBlogs,
      totalSevices,
      totalPortfolio,
      totalComments,
      totalTestimonials,
      totalEducations,
      totalExperiences,
      totalAdvantages,
      totalFiles,
    },
  });
});
//logged users dashboard
export const getMyDashboard = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    email: req.headers.email,
  });
  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not found",
    });

  const [
    blogs,
    services,
    portfolios,
    testimonials,
    educations,
    experiences,
    advantages,
  ] = await Promise.all([
    Blog.countDocuments({ author: user._id }),
    Service.countDocuments({ author: user._id }),
    Portfolio.countDocuments({ author: user._id }),
    Testimonial.countDocuments({ author: user._id }),
    Education.countDocuments({ author: user._id }),
    Experience.countDocuments({ author: user._id }),
    Advantage.countDocuments({ author: user._id }),
  ]);
  res.status(200).json({
    success: true,
    data: {
      blogs,
      services,
      portfolios,
      testimonials,
      educations,
      experiences,
      advantages,
    },
  });
});

//recent data

export const getRecentDashboard = asyncHandler(async (req, res) => {
  const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);

  const recentPortfolios = await Portfolio.find()
    .sort({ createdAt: -1 })
    .limit(5);

  const recentComments = await Comment.find()
    .populate("user", "email")
    .populate("blog", "title")
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).json({
    success: true,
    data: {
      recentBlogs,
      recentPortfolios,
      recentComments,
    },
  });
});

const dashboardController = {
  getDashboard,
  getMyDashboard,
  getRecentDashboard,
};

export default dashboardController;
