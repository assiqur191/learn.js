import asyncHandler from "express-async-handler";
import Education from "../models/education.model.js";
import User from "../models/user.model.js";
//create
export const createEducation = asyncHandler(async (req, res) => {
  const {
    degree,
    institution,
    fieldOfStudy,
    startYear,
    endYear,
    grade,
    description,
  } = req.body;

  const user = await User.findOne({
    email: req.headers.email,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const education = await Education.create({
    degree,
    institution,
    fieldOfStudy,
    startYear,
    endYear,
    grade,
    description,
    author: user._id,
  });

  res.status(201).json({
    success: true,
    message: "education created successfully",
    data: education,
  });
});
//all
export const getAllEducation = asyncHandler(async (req, res) => {
  const educations = await Education.find()
    .populate("author", "email")
    .sort({ createdAt: -1 });

  if (educations.length === 0)
    return res.status(404).json({ message: "No Education fond" });
  res.status(200).json({
    success: true,
    data: educations,
  });
});
//singel
export const getSingleEducation = asyncHandler(async (req, res) => {
  const education = await Education.findById(req.params.id).populate(
    "author",
    "email",
  );

  if (!education)
    return res.status(404).json({ message: "Education not found" });
  res.status(200).json({
    success: true,
    data: education,
  });
});
//update
export const updateEducation = asyncHandler(async (req, res) => {
  const education = await Education.findById(req.params.id);

  if (!education)
    return res.status(404).json({
      message: "Education not found",
    });
  const user = await User.findOne({
    email: req.headers.email,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (education.author.toString() !== user._id.toString())
    return res.status(403).json({ message: "you are not authorized" });

  const {
    degree,
    institution,
    fieldOfStudy,
    startYear,
    endYear,
    grade,
    description,
  } = req.body;

  education.degree = degree ?? education.degree;
  education.institution = institution ?? education.institution;
  education.fieldOfStudy = fieldOfStudy ?? education.fieldOfStudy;
  education.startYear = startYear ?? education.startYear;
  education.endYear = endYear ?? education.endYear;
  education.grade = grade ?? education.grade;
  education.description = description ?? education.description;

  await education.save();

  res.status(200).json({
    success: true,
    message: "Education updated successfully",
    data: education,
  });
});
//delete
export const deleteEducation = asyncHandler(async (req, res) => {
  const education = await Education.findById(req.params.id);

  if (!education)
    return res.status(404).json({ message: "Education not found" });

  const user = await User.findOne({
    email: req.headers.email,
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (education.author.toString() !== user._id.toString())
    return res.status(403).json({
      message: "UnAthurized",
    });

  await education.deleteOne();
  res.status(200).json({
    success: true,
    message: "Edication Deleted successfully",
  });
});

export const educationByUser = asyncHandler(async (req, res) => {
  const educations = await Education.find({
    author: req.headers._id,
  });
  if (educations.length == 0)
    return res
      .status(404)
      .json({ message: "there is no education for this user" });

  res.status(200).json({
    success: true,
    data: educations,
  });
});

const educationController = {
  createEducation,
  getAllEducation,
  getSingleEducation,
  updateEducation,
  deleteEducation,
  educationByUser,
};

export default educationController;
