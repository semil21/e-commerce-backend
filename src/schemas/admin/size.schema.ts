import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const Size = mongoose.model("Size", sizeSchema);
