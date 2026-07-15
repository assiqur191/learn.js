import { model, Schema } from "mongoose";

const seviceSchema = new Schema(
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
      required: [true, "Service description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    img: {
      type: String,
      required: [true, "Service image is required"],
      trim: true,
      match: [/^https?:\/\/.+/, "Please provide a valid image URL"],
    },
  },
  {
    timestamps: true,
  },
);
const Service = model("Service", seviceSchema);

export default Service;
