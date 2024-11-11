import UserDTO from "../dto/user.dto.js";
import UserService from "../services/user.service.js";
const userService = new UserService();
import generateToken from "../utils/jsonwebtoken.js";

class UserController {
	async register(req, res) {
		const { first_name, last_name, email, password, age } = req.body;

		try {
			const usuario = await userService.registerUser({
				first_name,
				last_name,
				email,
				password,
				age,
			});

			const token = generateToken({
				first_name: usuario.first_name,
				last_name: usuario.last_name,
				email: usuario.email,
				role: usuario.role,
				age: usuario.age,
				cartID: usuario.cartID,
			});

			res.cookie("coderCookieToken", token, {
				maxAge: 60 * 60 * 1000,
				httpOnly: true,
			});

			res.status(201).redirect("/profile");
		} catch (error) {
			res.status(500).send({ message: "Error interno del server", error });
		}
	}

	async login(req, res) {
		const { email, password } = req.body;
		try {
			const usuario = await userService.loginUser(email, password);

			const token = generateToken({
				first_name: usuario.first_name,
				last_name: usuario.last_name,
				email: usuario.email,
				role: usuario.role,
				age: usuario.age,
				cartID: usuario.cartID,
			});

			res.cookie("coderCookieToken", token, {
				maxAge: 60 * 60 * 1000,
				httpOnly: true,
			});

			res.status(200).redirect("/profile");
		} catch (error) {
			res.status(500).send({ message: "Error interno del server", error });
		}
	}

	async current(req, res) {
		if (req.user) {
			const user = req.user;
			const userDTO = new UserDTO(user);
			res.render("profile", { usuario: userDTO });
		} else {
			res.send("No autorizado");
		}
	}

	async logout(req, res) {
		res.clearCookie("coderCookieToken");
		res.redirect("/login");
	}
}

export default UserController;
