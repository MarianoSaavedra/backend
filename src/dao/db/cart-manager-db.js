import CartModel from "../models/carts.models.js";

class CartManager {
	//CREAR CARRITO
	async addCart() {
		try {
			const newCart = new CartModel({ products: [] });
			await newCart.save();
			return newCart;
		} catch (error) {
			return console.log("Error creando el carrito");
		}
	}

	// BUSCAR CARRITO POR ID
	async getCartById(cartID) {
		try {
			const cartBuscado = await CartModel.findById(cartID);

			if (!cartBuscado) {
				throw new Error("No existe el carrito que contenga la ID buscada");
			}
			return cartBuscado;
		} catch (error) {
			return console.error("Error buscando el carrito");
		}
	}

	// AGREGAR PRODUCTOS POR ID DE CARRITO
	async addProductCart(cartID, productID, quantity = 1) {
		try {
			const cart = await this.getCartById(cartID);
			const isProduct = cart.products.find((productos) => productos.product._id.toString() === productID);

			if (isProduct) {
				isProduct.quantity += quantity;
			} else {
				cart.products.push({ product: productID, quantity: quantity });
			}

			cart.markModified("products");
			await cart.save();
			return cart;
		} catch (error) {
			console.error("Error agregando el producto al carrito");
		}
	}

	async updateProductCart(cartID, productID, quantity = 1) {
		try {
			const cart = await CartModel.findOneAndUpdate(
				{ _id: cartID, "products.product": productID },
				{ $set: { "products.$.quantity": quantity } },
				{ new: true }
			);

			cart.markModified("products");
			await cart.save();
			return cart;
		} catch (error) {
			console.error("Error agregando el producto al carrito");
		}
	}

	async deleteProductsCart(cartID) {
		try {
			const cart = await this.getCartById(cartID);
			console.log(cart.products);

			cart.products = [];
			cart.markModified("products");
			await cart.save();
			return cart;
		} catch (error) {
			console.error("Error agregando el producto al carrito");
		}
	}
}

export default CartManager;
