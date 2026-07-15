import express from "express";
import productController from "../controllers/product.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post(
  "/create-product",
  authmiddleware.auth,
  productController.createProduct,
);
router.get("/all-products", authmiddleware.auth, productController.getProducts);

export default router;
