import { Schema, model } from "mongoose";

const educationSchema = new Schema(
  {
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
      minlength: [2, "Degree must be at least 2 characters"],
      maxlength: [100, "Degree cannot exceed 100 characters"],
    },

    institution: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
      maxlength: [150, "Institution name is too long"],
    },

    fieldOfStudy: {
      type: String,
      required: [true, "Field of study is required"],
      trim: true,
      maxlength: [100, "Field of study is too long"],
    },

    startYear: {
      type: Number,
      required: [true, "Start year is required"],
      min: [1950, "Invalid year"],
      max: [2100, "Invalid year"],
    },

    endYear: {
      type: Number,
      required: [true, "End year is required"],
      min: [1950, "Invalid year"],
      max: [2100, "Invalid year"],
    },

    grade: {
      type: String,
      trim: true,
      maxlength: [30, "Grade is too long"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
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

const Education = model("Education", educationSchema);

export default Education;
