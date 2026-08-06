import asyncHandler from "express-async-handler";
import Experience from "../models/experience.model.js";
import User from "../models/user.model.js";

///create
export const createExperience = asyncHandler(async (req, res) => {
  const {
    company,
    position,
    employmentType,
    location,
    startDate,
    endDate,
    currentlyWorking,
    description,
  } = req.body;

  const user = await User.findOne({
    email: req.headers.email,
  });

  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not found",
    });

  const experience = await Experience.create({
    company,
    position,
    employmentType,
    location,
    startDate,
    endDate,
    currentlyWorking,
    description,
    author: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Experience added successfully",
    data: experience,
  });
});

//all
export const getAllExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find()
    .populate("author", "email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: experiences,
  });
});

//single
export const getSingleExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id).populate(
    "author",
    "email",
  );

  if (!experience) {
    return res.status(404).json({
      success: false,
      message: "Experience not found",
    });
  }

  res.status(200).json({
    success: true,
    data: experience,
  });
});

//update
export const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    return res.status(404).json({
      success: false,
      message: "Experience not found",
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

  if (experience.author.toString() !== user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const {
    company,
    position,
    employmentType,
    location,
    startDate,
    endDate,
    currentlyWorking,
    description,
  } = req.body;

  experience.company = company;
  experience.position = position;
  experience.employmentType = employmentType;
  experience.location = location;
  experience.startDate = startDate;
  experience.endDate = endDate;
  experience.currentlyWorking = currentlyWorking;
  experience.description = description;

  await experience.save();

  res.status(200).json({
    success: true,
    message: "Experience updated successfully",
    data: experience,
  });
});

//delete

export const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    return res.status(404).json({
      success: false,
      message: "Experience not found",
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

  if (experience.author.toString() !== user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  await experience.deleteOne();

  res.status(200).json({
    success: true,
    message: "Experience deleted successfully",
  });
});

/// user -> all experiances

export const getMyExperiences = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    email: req.headers.email,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const experiences = await Experience.find({
    author: user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    total: experiences.length,
    data: experiences,
  });
});

const experienceController = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
  getMyExperiences,
};

export default experienceController;
