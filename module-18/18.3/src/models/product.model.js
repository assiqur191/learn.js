import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: Number,
});

const Product = mongoose.model("product", productSchema);

export default Product;
