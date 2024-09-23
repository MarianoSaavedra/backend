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
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
	cartID: {
		type: Object,
		default: await manager.addCart(),
	},
});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
