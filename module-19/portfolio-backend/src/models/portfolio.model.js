import { model, Schema } from "mongoose";

const portfolioSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    img: {
      type: String,
      required: [true, "Project image is required"],
      trim: true,
      match: [/^https?:\/\/.+/, "Please provide a valid image URL"],
    },

    link: {
      type: String,
      required: [true, "Project link is required"],
      trim: true,
      match: [/^https?:\/\/.+/, "Please provide a valid URL"],
    },
    category: {
      type: String,
      required: [true, "Project category is required"],
      trim: true,
      enum: {
        values: [
          "HTML",
          "CSS",
          "Tailwind CSS",
          "JavaScript",
          "React",
          "Node.js",
          "Express",
          "MongoDB",
          "MERN",
          "Frontend",
          "Backend",
          "Full Stack",
          "PHP",
          "Laravel",
          "Python",
          "UI/UX",
          "Other",
        ],
        message: "Invalid project category",
      },
    },
  },
  {
    timestamps: true,
  },
);
const Protfolio = model("Portfolio", portfolioSchema);

export default Protfolio;
