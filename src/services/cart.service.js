import CartRepository from "../repositories/cart.repository.js";
const cartRepository = new CartRepository();

class CartService {
	async createCart() {
		return await cartRepository.createCart();
	}

	async getCartById(id) {
		return await cartRepository.getCartById(id);
	}

	async updateCart(id, cartData) {
		return await cartRepository.updateCart(id, cartData);
	}

	async updateProductCart(cid, pid, quantity) {
		return await cartRepository.updateProductCart(cid, pid, quantity);
	}

	async deleteProductsCart(id) {
		return await cartRepository.deleteProductsCart(id);
	}

	async deleteCart(id) {
		return await cartRepository.deleteCart(id);
	}

	async purchaseCart(id) {
		return await cartRepository.purchaseCart(id);
	}
}

export default CartService;
