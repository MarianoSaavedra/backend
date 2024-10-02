import mongoose from "mongoose";
import CartManager from "../db/cart-manager-db.js";

const manager = new CartManager();

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	age: {
		type: Number,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	cartID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "carts",
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
});

userSchema.pre("save", async function (next) {
	if (!this.cartID) {
		const newCart = await manager.addCart();
		this.cartID = newCart._id;
	}
	next();
});

// userSchema.pre("findOne", function (next) {
// 	this.populate({
// 		path: "cartID",
// 		populate: {
// 			path: "products",
// 		},
// 	}),
// 		next();
// });

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
