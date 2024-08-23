import mongoose from "mongoose";

export const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  imageUrl: { type: String, required: true },
});
