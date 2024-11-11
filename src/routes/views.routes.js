import express from "express";
const router = express.Router();

import ProductModel from "../dao/models/product.models.js";

import { passportCall, authorization } from "../utils/utils.js";

router.get("/", async (req, res) => {
	res.render("index");
});

router.get("/products", passportCall("jwt"), authorization("user"), async (req, res) => {
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

router.get("/realtimeproducts", passportCall("jwt"), authorization("admin"), async (req, res) => {
	let limit = req.query.limit || 5;
	let page = req.query.page || 1;

	try {
		const products = await ProductModel.paginate({}, { limit, page });

		res.render("realTimeProducts", {
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

router.get("/register", (req, res) => {
	if (req.cookies.coderCookieToken) {
		return res.redirect("/profile");
	}
	res.render("register");
});

router.get("/login", (req, res) => {
	if (req.cookies.coderCookieToken) {
		return res.redirect("/profile");
	}
	res.render("login");
});

router.get("/profile", passportCall("jwt"), (req, res) => {
	res.render("profile", { usuario: req.user });
});

router.get("*", (req, res) => {
	res.render("error");
});

export default router;
