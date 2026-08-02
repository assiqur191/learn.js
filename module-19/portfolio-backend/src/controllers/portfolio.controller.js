import asyncHandler from "express-async-handler";
import Portfolio from "./../models/portfolio.model.js";
import cloudinary from "../configs/coudinary.config.js";

//create portfolio
export const createPortfolio = asyncHandler(async (req, res) => {
  //teke data and file.
  //create model
  //res
  const { title, link, cetegory } = JSON.parse(req.body.data);
  if (!req.file) {
    return res.status(400).json({
      message: "Image is required",
    });
  }

  const portfolio = await Portfolio.create({
    title,
    cetegory,
    link,
    img: req.file.path,
    public_id: req.file.filename,
  });
  res.status(201).json({
    success: true,
    message: "Portfolio created successfully",
    data: portfolio,
  });
});

// Get All Portfolio
export const getAllPortfolio = asyncHandler(async (req, res) => {
  const portfolios = await Portfolio.find().sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    data: portfolios,
  });
});

// Get Single Portfolio
export const getSinglePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);

  if (!portfolio) {
    return res.status(404).json({
      message: "Portfolio not found",
    });
  }

  res.status(200).json({
    success: true,
    data: portfolio,
  });
});

//update portfolio
export const updatePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio)
    return res.status(404).json({
      message: "Portfolio not found",
    });

  const { title, link, cetegory } = JSON.parse(req.body.data);

  portfolio.title = title;
  portfolio.link = link;
  portfolio.cetegory = cetegory;

  if (req.file) {
    await cloudinary.uploader.destroy(portfolio.public_id);

    portfolio.img = req.file.path;
    portfolio.public_id = req.file.filename;
  }

  await portfolio.save();

  res.status(200).json({
    success: true,
    message: "Portfolio Update successfully",
    data: portfolio,
  });
});

//delete portfolio
export const deletePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio)
    return res.status(404).json({
      message: "Portfolio not found",
    });

  await cloudinary.uploader.destroy(public_id);

  await portfolio.deleteOne();

  res.status(200).json({
    success: true,
    message: "Portfolio Delete successfully",
  });
});

const portfolioController = {
  createPortfolio,
  getAllPortfolio,
  getSinglePortfolio,
  updatePortfolio,
  deletePortfolio,
};
export default portfolioController;
