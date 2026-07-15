import { model, Schema } from "mongoose";

const fileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      default: "image",
    },

    fileSize: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const File = model("File", fileSchema);
export default File;
