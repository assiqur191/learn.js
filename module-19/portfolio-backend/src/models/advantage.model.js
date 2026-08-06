import { Schema, model } from "mongoose";

const advantageSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Skill title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [50, "Title cannot exceed 50 characters"],
    },

    percentage: {
      type: Number,
      required: [true, "Percentage is required"],
      min: [0, "Minimum percentage is 0"],
      max: [100, "Maximum percentage is 100"],
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Frontend",
        "Backend",
        "Database",
        "Programming Language",
        "DevOps",
        "Tools",
        "Other",
      ],
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Advantage = model("Advantage", advantageSchema);

export default Advantage;
