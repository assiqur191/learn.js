import cloudinary from "../configs/coudinary.config.js";
import File from "../models/file.model.js";

const uploadFile = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        success: false,
        message: "Please Upload a file",
      });
    const file = await File.create({
      originalName: req.file.originalname,
      fileUrl: req.file.path,
      public_id: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    });
    res.status(201).json({
      success: true,
      message: "File Upload Successfull",
      file,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all file
/////////////////

const getAllFile = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    if (!files.length === 0)
      return res.status(404).json({
        message: "There is No file",
      });
    res.status(200).json({
      success: true,
      files: files,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Delete File
///////////////

const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file)
      return res.status(404).json({
        message: "There is No file",
      });

    await cloudinary.uploader.destroy(file.public_id);

    await file.deleteOne();

    res.status(200).json({
      success: true,
      message: "File Delete Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const fileController = { uploadFile, getAllFile, deleteFile };
export default fileController;
