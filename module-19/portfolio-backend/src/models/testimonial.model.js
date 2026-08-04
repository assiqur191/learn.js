import { Schema, model } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      minlength: [2, "Designation must be at least 2 characters"],
      maxlength: [100, "Designation cannot exceed 100 characters"],
    },

    message: {
      type: String,
      required: [true, "Testimonial message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [500, "Message cannot exceed 500 characters"],
    },

    img: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },

    public_id: {
      type: String,
      required: [true, "Cloudinary public_id is required"],
      trim: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // use your actual model name
      required: [true, "Author is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Testimonial = model("Testimonial", testimonialSchema);

export default Testimonial;
