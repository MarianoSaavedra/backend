import CartModel from "./models/cart.models.js";
import TicketModel from "./models/ticket.models.js";

class CartDao {
	async findById(id) {
		return await CartModel.findById(id);
	}

	async save(cartData) {
		const cart = new CartModel(cartData);
		return await cart.save();
	}

	async update(id, cartData) {
		return await CartModel.findByIdAndUpdate(id, cartData);
	}

	async updateProductCart(cid, pid, quantity) {
		return await CartModel.findOneAndUpdate(
			{ _id: cid, "products.product": pid },
			{ $set: { "products.$.quantity": quantity } },
			{ new: true }
		);
	}

	async deleteProductsCart(id) {
		return await CartModel.findOneAndUpdate({ _id: id }, { $set: { products: [] } }, { new: true });
	}

	async delete(id) {
		return await CartModel.findByIdAndDelete(id);
	}

	async purchaseCart(totalPrice, email, codigo, fecha) {
		const ticket = new TicketModel({
			code: codigo,
			purchase_datetime: fecha,
			amount: totalPrice,
			purchaser: email,
		});
		return await ticket.save();
	}
}

export default CartDao;
