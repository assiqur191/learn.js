import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      trim: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Comment = model("Comment", commentSchema);

export default Comment;
