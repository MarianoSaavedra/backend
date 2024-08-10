import express from "express";
const router = express.Router();
import ProductManager from "../controllers/product-manager.js";

const manager = new ProductManager("./src/data/products.json");

// AGREGAR UN PRODUCTO //

router.post("/", async (req, res) => {
	const newProduct = req.body;

	try {
		let respuesta = await manager.addProduct(newProduct);

		switch (respuesta) {
			case "Todos los campos son obligatorios":
				res.send({ status: 400, body: respuesta });
				break;
			case "El codigo esta repetido":
				res.send({ status: 400, body: respuesta });
				break;
			case "Producto agregado correctamente":
				res.status({ status: 201, body: respuesta });
				break;
		}
	} catch (error) {
		res.send({ status: 500, body: "No se pudo cargar el producto", error });
	}
});

// BUSCAR PRODUCTOS //
router.get("/", async (req, res) => {
	const limite = req.query.limit;

	try {
		const arrayProducts = await manager.getProducts();

		if (arrayProducts.length === 0) {
			return res.send({ status: 200, body: "Aun no hay productos cargados" });
		}

		if (limite && !isNaN(limite) && limite > 0) {
			return res.send({ status: 200, body: arrayProducts.slice(0, limite) });
		}

		return res.send({ status: 200, body: arrayProducts });
	} catch (error) {
		res.send({ status: 500, body: "Error interno del servidor" });
	}
});

//GET PRODUCT BY ID
router.get("/:pid", async (req, res) => {
	const id = req.params.pid;

	let respuesta = await manager.getProductsById(parseInt(id));

	res.send(respuesta);
});

//UPDATE PRODUCT BY ID
router.put("/:pid", async (req, res) => {
	const id = req.params.pid;
	const nuevosDatos = req.body;

	let respuesta = await manager.updateProductById(parseInt(id), nuevosDatos);

	res.send(respuesta);
});

//DELETE PRODUCT BY ID
router.delete("/:pid", async (req, res) => {
	const id = req.params.pid;

	let respuesta = await manager.deleteProductById(parseInt(id));

	res.send(respuesta);
});

export default router;
