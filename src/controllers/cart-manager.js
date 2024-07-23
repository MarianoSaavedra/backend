const fs = require("fs").promises;

class CartManager {
	constructor(path) {
		this.carts = [];
		this.path = path;
	}

	//STATIC
	static ultId = 0;

	async addCart() {
		try {
			const nuevoCarrito = {
				id: ++CartManager.ultId,
				productos: [],
			};

			this.carts.push(nuevoCarrito);

			await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
			return nuevoCarrito;
		} catch (error) {
			console.log("Error creando el carrito");
		}
	}

	async getCartById(id) {
		let carritoBuscado = await this.carts.find((carrito) => carrito.id === parseInt(id));

		return carritoBuscado;
	}

	//AGREGAR PRODUCTO A UN CARRITO SELECCIONADO
	async addProductCart(cid, pid, quantity = 1) {
		const carrito = await this.getCartById(parseInt(cid));
		const isProduct = carrito.productos.find((productos) => productos.product === pid);

		if (isProduct) {
			isProduct.quantity += quantity;
		} else {
			carrito.productos.push({ product: pid, quantity: quantity });
		}

		await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
		return carrito;
	}
}

module.exports = CartManager;
