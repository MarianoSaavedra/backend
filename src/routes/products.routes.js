import express from "express";
const router = express.Router();

import ProductController from "../controllers/product.controller.js";
const productController = new ProductController();

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProductById);

router.delete("/:id", productController.deleteProductById);

export default router;
