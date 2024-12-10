import mongoose from "mongoose";

const adminLoginSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const Admin = mongoose.model("admin", adminLoginSchema);
