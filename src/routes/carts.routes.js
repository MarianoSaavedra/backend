const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager.js");

const manager = new CartManager("./src/data/carts.json");

// CREAR CARRITO //

router.post("/", async (req, res) => {
	try {
		let newCart = await manager.addCart();
		res.send({ status: 201, body: "El carrito fue creado con extio", newCart });
	} catch (error) {
		res.send({ status: 500, body: "Error del servidor", error });
	}
});

// BUSCAR CARRITO POR ID //

router.get("/:cid", async (req, res) => {
	const cartID = req.params.cid;

	try {
		const cartBuscado = await manager.getCartById(parseInt(cartID));
		res.send({ status: 200, body: "El carrito fue encontrado con exito", carrito: cartBuscado.products });
	} catch (error) {
		res.send({ status: 500, body: "Error del servidor", error });
	}
});

// AGREGAR PRODUCTOS POR ID DE CARRITO //

router.post("/:cid/product/:pid", async (req, res) => {
	const cartID = req.params.cid;
	const productID = req.params.pid;
	const quantity = req.body.quantity || 1;

	try {
		const updatedCart = await manager.addProductCart(parseInt(cartID), productID, quantity);
		res.send({ status: 200, body: "Producto agregado correctamente", productos: updatedCart.products });
	} catch (error) {
		res.send({ status: 500, body: "Error al ingresar el producto al carrito" });
	}
});

module.exports = router;
