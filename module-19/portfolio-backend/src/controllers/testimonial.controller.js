import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Testimonial from "../models/testimonial.model.js";

export const createTestimonial = asyncHandler(async (req, res) => {
  if (!req.file)
    return res.status(400).json({
      success: false,
      message: "Image is required",
    });
  const { name, designation, message } = JSON.parse(req.body.data);
  const user = await User.findOne({
    email: req.headers.email,
  });

  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not found",
    });

  const testimonial = await Testimonial.create({
    name,
    designation,
    message,
    img: req.file.path,
    public_id: req.file.filename,
    author: user._id,
  });
  res.status(201).json({
    success: true,
    message: "Testimonial created successfully",
    data: testimonial,
  });
});
//get all testimonial
export const getAllTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find()
    .populate("author", "email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: testimonials,
  });
});
//get single
export const getSingleTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id).populate(
    "author",
    "email",
  );

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      message: "Testimonial not found",
    });
  }

  res.status(200).json({
    success: true,
    data: testimonial,
  });
});
//update
export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial)
    return res.status(404).json({
      success: false,
      message: "Testimonial not found",
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

  if (testimonial.author.toString() !== user._id.toString())
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });

  const { name, designation, message } = JSON.parse(req.body.data);

  testimonial.name = name;
  testimonial.designation = designation;
  testimonial.message = message;

  if (req.file) {
    testimonial.img = req.file.path;
    testimonial.public_id = req.file.filename;
  }

  await testimonial.save();

  res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: testimonial,
  });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      message: "Testimonial not found",
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

  if (testimonial.author.toString() !== user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }

  await cloudinary.uploader.destroy(testimonial.public_id);

  await testimonial.deleteOne();

  res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});

// get testimonial by user.

export const testimonialByuser = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({
    author: req.params.id,
  });
  if (testimonials.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Testimonial not found",
    });
  }
  res.status(200).json({
    success: true,
    data: testimonials,
  });
});

const testimonialController = {
  createTestimonial,
  getAllTestimonials,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
  testimonialByuser,
};

export default testimonialController;
