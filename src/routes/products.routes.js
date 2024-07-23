const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");

const manager = new ProductManager("./src/data/products.json");

//AGREGAR UN PRODUCTO
router.post("/", async (req, res) => {
	const { title, description, price, thumbnails, code, stock, category } = req.body;

	let respuesta = await manager.addProduct({ title, description, price, thumbnails, code, stock, category });
	res.send(respuesta);
});

//GET PRODUCT
router.get("/", async (req, res) => {
	let respuesta = await manager.getProducts();
	let limite = req.query.limit;

	if (respuesta.length <= 0) {
		res.send("Aun no hay productos");
	} else {
		if (!limite) {
			res.send(respuesta);
		} else {
			res.send(respuesta.slice(0, limite));
		}
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

module.exports = router;
