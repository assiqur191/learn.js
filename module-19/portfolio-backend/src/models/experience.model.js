import { Schema, model } from "mongoose";

const experienceSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: [2, "Company name is too short"],
      maxlength: [100, "Company name is too long"],
    },

    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      minlength: [2, "Position is too short"],
      maxlength: [100, "Position is too long"],
    },

    employmentType: {
      type: String,
      required: true,
      enum: [
        "Full-time",
        "Part-time",
        "Internship",
        "Contract",
        "Freelance",
        "Remote",
      ],
    },

    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Location is too long"],
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    currentlyWorking: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
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

const Experience = model("Experience", experienceSchema);

export default Experience;
