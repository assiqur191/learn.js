import asyncHandler from "express-async-handler";
import Service from "./../models/services.model.js";
import cloudinary from "../configs/coudinary.config.js";

export const createService = asyncHandler(async (req, res) => {
  const { title, description } = JSON.parse(req.body.data);

  const img = req.file.path;
  const public_id = req.file.filename;

  const service = await Service.create({
    title,
    description,
    img,
    public_id,
  });

  res.status(201).json({
    success: true,
    message: "Service create Successfully",
    data: service,
  });
});

//Get All servicess

export const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  if (services.length === 0)
    return res.status(404).json({
      message: "No Services found",
    });
  res.status(200).json({
    success: true,
    data: services,
  });
});

export const getSingleService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service)
    return res.status(404).json({
      message: "Services not found",
    });

  res.status(200).json({
    success: true,
    data: service,
  });
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service)
    return res.status(404).json({
      message: "Services not found",
    });

  const { title, description } = JSON.parse(req.body.data);

  service.title = title;
  service.description = description;

  if (req.file) {
    await cloudinary.uploader.destroy(service.public_id);

    service.img = req.file.path;
    service.public_id = req.file.filename;
  }
  await service.save();
  res.status(200).json({
    success: true,
    message: "Service Updated successfully",
    data: service,
  });
  //first check service
  //delete cloudinary
  //get data and file from req
  //set new valu with old
  //save();
});

// delete service
export const deleteService = asyncHandler(async (req, res) => {
  //find id and service .
  //delete cludinary.
  //delete Service.
  //res.

  const service = await Service.findById(req.params.id);
  if (!service)
    return res.status(404).json({
      message: "Services not found",
    });
  await cloudinary.uploader.destroy(service.public_id);

  await service.deleteOne();

  res.status(200).json({
    success: true,
    message: "Service Delete successfully",
    data: service,
  });
});

const serviceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
export default serviceController;
