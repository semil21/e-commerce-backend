import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  image: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const Image = mongoose.model("Image", imageSchema);
