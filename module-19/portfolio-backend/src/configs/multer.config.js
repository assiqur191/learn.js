import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./coudinary.config.js";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf", "docx", "zip"],
  },
});

const upload = multer({ storage });
export default upload;
