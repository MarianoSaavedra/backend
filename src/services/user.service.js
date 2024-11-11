import { createHash, isValidPassword } from "../utils/utils.js";
import UserRepository from "../repositories/user.repository.js";
import UserDTO from "../dto/user.dto.js";
const userRepository = new UserRepository();

import CartService from "../services/cart.service.js";
const cartService = new CartService();

class UserService {
	async registerUser(userData) {
		const existeUsuario = await userRepository.getUserByEmail(userData.email);
		if (existeUsuario) throw new Error("El usuario ya existe");

		userData.password = createHash(userData.password);

		const nuevoCarrito = await cartService.createCart();
		userData.cartID = nuevoCarrito._id;

		return await userRepository.createUser(userData);
	}

	async loginUser(email, password) {
		const user = await userRepository.getUserByEmail(email);
		if (!user || !isValidPassword(password, user)) throw new Error("Credenciales incorrectas");
		return user;
	}

	async current(userData) {
		const userDTO = new UserDTO(userData);
		return userDTO;
	}
}

export default UserService;
