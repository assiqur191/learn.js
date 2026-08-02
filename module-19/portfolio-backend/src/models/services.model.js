import { Schema, model } from "mongoose";

const serviceSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    img: {
      type: String,
      required: [true, "Image is required"],
    },

    public_id: {
      type: String,
      required: [true, "Cloudinary Public ID is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Service = model("Service", serviceSchema);

export default Service;
