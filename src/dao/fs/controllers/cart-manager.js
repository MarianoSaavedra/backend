import { promises as fs } from "fs";

class CartManager {
	constructor(path) {
		this.carts = [];
		this.path = path;
	}

	//STATIC
	static ultId = 0;

	//METODOS

	// CREAR CARRITO //

	async addCart() {
		try {
			const newCart = {
				id: ++CartManager.ultId,
				products: [],
			};

			this.carts.push(newCart);

			await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));

			return newCart;
		} catch (error) {
			console.error("Error creando el carrito", error);
		}
	}

	// BUSCAR CARRITO POR ID //

	getCartById(cartID) {
		try {
			const cartBuscado = this.carts.find((carrito) => carrito.id === cartID);

			if (!cartBuscado) {
				throw new Error("No existe el carrito que contenga la ID buscada");
			}
			return cartBuscado;
		} catch (error) {
			console.error("Error buscando el carrito", error);
		}
	}

	// AGREGAR PRODUCTOS POR ID DE CARRITO //

	async addProductCart(cartID, productID, quantity = 1) {
		const cart = await this.getCartById(cartID);
		const isProduct = cart.products.find((productos) => productos.product === productID);

		try {
			if (isProduct) {
				isProduct.quantity += quantity;
			} else {
				cart.products.push({ product: productID, quantity: quantity });
			}

			await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));

			return cart;
		} catch (error) {
			console.error("Error agregando el producto al carrito");
		}
	}
}

export default CartManager;
