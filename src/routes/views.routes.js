import express from "express";
const router = express.Router();

import ProductManager from "../controllers/product-manager.js";
const manager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
	res.render("index");
});

router.get("/products", async (req, res) => {
	const productos = await manager.getProducts();

	res.render("index", { productos });
});

router.get("/realtimeproducts", async (req, res) => {
	const productos = await manager.getProducts();
	res.render("realTimeProducts", { productos });
});

export default router;
