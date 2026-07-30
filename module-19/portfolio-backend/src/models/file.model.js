import { model, Schema } from "mongoose";

const fileSchema = new Schema(
  {
    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    public_id: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
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
