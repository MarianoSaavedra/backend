import CartService from "../services/cart.service.js";
const cartService = new CartService();

class CartController {
	async create(req, res) {
		try {
			const newCart = await cartService.createCart();
			res.status(201).send({ message: "Carrito creado correctamente", newCart });
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor ", error: error });
		}
	}

	async getCart(req, res) {
		const { cid } = req.params;
		try {
			const cart = await cartService.getCartById(cid);
			if (!cart) return res.status(404).send({ message: "Carrito no encontrado" });
			res.status(200).send({ message: "Carrito encontrado", cart });
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor ", error: error });
		}
	}

	async addProductToCart(req, res) {
		const { cid, pid } = req.params;
		const { quantity = 1 } = req.body;
		try {
			const cart = await cartService.getCartById(cid);
			if (!cart) return res.status(404).send({ message: "Carrito no encontrado" });

			const isProduct = cart.products.find((productos) => productos.product._id.toString() === pid);

			if (isProduct) {
				isProduct.quantity += quantity;
			} else {
				cart.products.push({ product: pid, quantity: quantity });
			}

			await cartService.updateCart(cid, cart);
			res.status(200).send({ message: "Carrito actualizado correctamente", cart });
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor ", error: error });
		}
	}

	async updateProductCart(req, res) {
		const { cid, pid } = req.params;
		const { quantity = 1 } = req.body;

		try {
			const cart = await cartService.updateProductCart(cid, pid, quantity);
			if (!cart) return res.status(404).send({ message: "Producto no encontrado" });
			res.status(200).send({ message: "Producto actualizado correctamente ", cart });
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor ", error: error });
		}
	}

	async deleteProductsCart(req, res) {
		const { cid } = req.params;
		try {
			const cart = await cartService.deleteProductsCart(cid);
			if (!cart) return res.status(404).send({ message: "Carrito no encontrado" });
			res.status(200).send({ message: "Productos eliminados del carrito correctamente ", cart });
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor ", error: error });
		}
	}

	async deleteCart(req, res) {
		const { cid } = req.params;
		try {
			const cart = await cartService.deleteCart(cid);
			if (!cart) return res.status(404).send({ message: "Carrito no encontrado" });
			res.status(200).send({ message: "Carrito eliminado correctamente ", cart });
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor ", error: error });
		}
	}

	async purchaseCart(req, res) {
		const { cid } = req.params;

		try {
			const ticket = await cartService.purchaseCart(cid);
			console.log(ticket);

			res.status(200).send({ message: "Compra realizada con exito ", ticket });
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor ", error: error });
		}
	}
}

export default CartController;
