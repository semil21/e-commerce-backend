import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  material: {
    type: String,
  },
  origin: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
