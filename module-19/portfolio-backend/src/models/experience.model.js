import { model, Schema } from "mongoose";

const experienceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    time: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Experience = model("Experience", experienceSchema);

export default Experience;
