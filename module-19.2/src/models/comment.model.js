import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
      minlength: [2, "Comment must be at least 2 characters"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "Blog is required"],
    },
  },
  {
    timestamps: true,
  },
);

commentSchema.index({ blog: 1 });
commentSchema.index({ user: 1 });

const Comment = model("Comment", commentSchema);

export default Comment;
