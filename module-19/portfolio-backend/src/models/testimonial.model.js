import { model, Schema } from "mongoose";

const testimonialSchema = new Schema(
  {
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      minlength: [2, "Client name must be at least 2 characters"],
      maxlength: [100, "Client name cannot exceed 100 characters"],
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      minlength: [2, "Address must be at least 2 characters"],
      maxlength: [200, "Address cannot exceed 200 characters"],
    },

    img: {
      type: String,
      required: [true, "Client image is required"],
      trim: true,
      match: [/^https?:\/\/.+/, "Please provide a valid image URL"],
    },

    feedback: {
      type: String,
      required: [true, "Feedback is required"],
      trim: true,
      minlength: [10, "Feedback must be at least 10 characters"],
      maxlength: [1000, "Feedback cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  },
);
const Testomonial = model("Testomonial", testimonialSchema);
export default Testomonial;
