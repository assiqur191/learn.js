import asyncHandler from "express-async-handler";
import Advantage from "../models/advantage.model.js";
import User from "../models/user.model.js";

// Create
export const createAdvantage = asyncHandler(async (req, res) => {
  const { title, percentage, category } = req.body;

  const user = await User.findOne({
    email: req.headers.email,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const advantage = await Advantage.create({
    title,
    percentage,
    category,
    author: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Advantage created successfully",
    data: advantage,
  });
});

// Get All
export const getAllAdvantages = asyncHandler(async (req, res) => {
  const advantages = await Advantage.find()
    .populate("author", "email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    total: advantages.length,
    data: advantages,
  });
});

// Get My Advantages
export const getMyAdvantages = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    email: req.headers.email,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const advantages = await Advantage.find({
    author: user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    total: advantages.length,
    data: advantages,
  });
});

// Get Single
export const getSingleAdvantage = asyncHandler(async (req, res) => {
  const advantage = await Advantage.findById(req.params.id).populate(
    "author",
    "email",
  );

  if (!advantage) {
    return res.status(404).json({
      success: false,
      message: "Advantage not found",
    });
  }

  res.status(200).json({
    success: true,
    data: advantage,
  });
});

// Update
export const updateAdvantage = asyncHandler(async (req, res) => {
  const advantage = await Advantage.findById(req.params.id);

  if (!advantage) {
    return res.status(404).json({
      success: false,
      message: "Advantage not found",
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

  if (advantage.author.toString() !== user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { title, percentage, category } = req.body;

  advantage.title = title;
  advantage.percentage = percentage;
  advantage.category = category;

  await advantage.save();

  res.status(200).json({
    success: true,
    message: "Advantage updated successfully",
    data: advantage,
  });
});

// Delete
export const deleteAdvantage = asyncHandler(async (req, res) => {
  const advantage = await Advantage.findById(req.params.id);

  if (!advantage) {
    return res.status(404).json({
      success: false,
      message: "Advantage not found",
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

  if (advantage.author.toString() !== user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  await advantage.deleteOne();

  res.status(200).json({
    success: true,
    message: "Advantage deleted successfully",
  });
});

const advantageController = {
  createAdvantage,
  getAllAdvantages,
  getMyAdvantages,
  getSingleAdvantage,
  updateAdvantage,
  deleteAdvantage,
};

export default advantageController;
