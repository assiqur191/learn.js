import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const product = req.body;
  //   console.log(product);
  try {
    const result = await Product.create(product);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  try {
    if (!products) return res.json({ message: "no products" });
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const productController = { createProduct, getProducts };

export default productController;
