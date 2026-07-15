import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    img: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Programming",
        "MERN",
        "React",
        "Node.js",
        "MongoDB",
        "JavaScript",
        "HTML",
        "CSS",
        "Career",
        "Other",
      ],
    },

    shortDescription: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);
const Blog = model("Blog", blogSchema);
export default Blog;
