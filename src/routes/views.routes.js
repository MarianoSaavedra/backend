import express from "express";
const router = express.Router();

import ProductManager from "../dao/db/product-manager-db.js";
import ProductModel from "../dao/models/products.models.js";
import passport from "passport";

import { passportCall, authorization } from "../utils/utils.js";

const manager = new ProductManager();

router.get("/", async (req, res) => {
	res.render("index");
});

router.get("/products", async (req, res) => {
	let limit = req.query.limit || 2;
	let page = req.query.page || 1;

	try {
		const products = await ProductModel.paginate({}, { limit, page });

		res.render("products", {
			productos: products.docs,
			totalPages: products.totalPages,
			prevPage: products.prevPage,
			nextPage: products.nextPage,
			page: page,
			hasPrevPage: products.hasPrevPage,
			hasNextPage: products.hasNextPage,
			prevLink: products.hasPrevPage ? `/products?limit=${limit}&page=${products.prevPage}` : null,
			nextLink: products.hasNextPage ? `/products?limit=${limit}&page=${products.nextPage}` : null,
		});
	} catch (error) {
		console.log(Error);
	}
});

router.get("/realtimeproducts", async (req, res) => {
	const productos = await manager.getProducts();
	res.render("realTimeProducts", { productos });
});

router.get("/register", (req, res) => {
	// if (req.session.login) {
	// 	return res.redirect("/profile");
	// }
	res.render("register");
});

router.get("/login", (req, res) => {
	// if (req.session.login) {
	// 	return res.redirect("/profile");
	// }
	res.render("login");
});

router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
	res.render("profile", { usuario: req.user });
});

router.get("*", (req, res) => {
	res.render("error");
});

export default router;
