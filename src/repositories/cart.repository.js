import CartDao from "../dao/cart.dao.js";
import UserDao from "../dao/user.dao.js";
import { ticketNumber } from "../utils/utils.js";

const cartDao = new CartDao();
const userDao = new UserDao();
class CartRepository {
	async createCart() {
		return await cartDao.save({ products: [] });
	}

	async getCartById(id) {
		return await cartDao.findById(id);
	}

	async updateCart(id, cartData) {
		return await cartDao.update(id, cartData);
	}

	async updateProductCart(cid, pid, quantity) {
		return await cartDao.updateProductCart(cid, pid, quantity);
	}

	async deleteProductsCart(id) {
		return await cartDao.deleteProductsCart(id);
	}

	async deleteCart(id) {
		return await cartDao.delete(id);
	}

	async purchaseCart(id) {
		const cart = await cartDao.findById(id);
		const user = await userDao.findOne({ cartID: id });

		let totalPrice = 0;

		const fecha = new Date();

		const codigo = ticketNumber();

		cart.products.forEach((item) => {
			totalPrice += item.product.price * item.quantity;
		});

		return await cartDao.purchaseCart(totalPrice, user.email, codigo, fecha);
	}
}

export default CartRepository;
