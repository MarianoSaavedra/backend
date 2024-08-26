import { Router } from "express";
import ProductManager from "../dao/db/product-manager-db.js";

const router = Router();
const manager = new ProductManager();

// AGREGAR UN PRODUCTO //

router.post("/", async (req, res) => {
	const newProduct = req.body;
	try {
		await manager.addProduct(newProduct);
		res.send({ status: 201, body: "Producto agregado correctamente" });
	} catch (error) {
		res.send({ status: 500, body: "No se pudo cargar el producto", error });
	}
});

// BUSCAR PRODUCTOS
router.get("/", async (req, res) => {
	const limit = parseInt(req.query.limit) || 10;
	const page = parseInt(req.query.page) || 1;
	const sort = req.query.sort === "desc" ? -1 : 1;
	const query = req.query.query;

	try {
		const products = await manager.getProducts({ limit, page, sort, query });

		res.json({
			status: "200",
			payload: products.docs,
			totalPages: products.totalPages,
			prevPage: products.prevPage,
			nextPage: products.nextPage,
			page: products.currentPage,
			hasPrevPage: products.hasPrevPage,
			hasNextPage: products.hasNextPage,
			prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}` : null,
			nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}` : null,
		});
	} catch (error) {
		res.json({
			status: 500,
			body: "Error interno del servidor",
		});
	}
});

//GET PRODUCT BY ID
router.get("/:pid", async (req, res) => {
	const id = req.params.pid;
	try {
		const productoBuscado = await manager.getProductsById(id);
		if (!productoBuscado) {
			return res.send({ status: 404, body: "Producto no encontrado" });
		}
		res.send({ status: 200, body: productoBuscado });
	} catch (error) {
		res.send({ status: 500, body: "Error del servidor" });
	}
});

//UPDATE PRODUCT BY ID
router.put("/:pid", async (req, res) => {
	try {
		const id = req.params.pid;
		const nuevosDatos = req.body;

		await manager.updateProductById(id, nuevosDatos);

		res.send({ status: 200, body: "Producto actualizado correctamente" });
	} catch (error) {
		res.send({ status: 500, body: "Ups, algo se rompio" });
	}
});

//DELETE PRODUCT BY ID
router.delete("/:pid", async (req, res) => {
	try {
		const id = req.params.pid;

		await manager.deleteProductById(id);

		res.send({ status: 200, body: "Producto eliminado correctamente" });
	} catch (error) {
		res.send({ status: 500, body: "Ups, algo se rompio" });
	}
});

export default router;
