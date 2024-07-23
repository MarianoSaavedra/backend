const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager.js");

const manager = new CartManager("./src/data/carts.json");

router.post("/", async (req, res) => {
	let respuesta = await manager.addCart();
	res.send(respuesta);
});

router.get("/:cid", async (req, res) => {
	const id = req.params.cid;

	let respuesta = await manager.getCartById(parseInt(id));

	res.send(respuesta);
});

router.post("/:cid/product/:pid", async (req, res) => {
	const cid = req.params.cid;
	const pid = req.params.pid;
	const quantity = req.body.quantity || 1;

	let respuesta = await manager.addProductCart(cid, pid, quantity);
	res.send(respuesta.productos);
});

module.exports = router;
