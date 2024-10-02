import { Router } from "express";
const router = Router();
import UserModel from "../dao/models/users.models.js";
import { createHash, isValidPassword, passportCall, authorization } from "../utils/utils.js";

import generateToken from "../utils/jsonwebtoken.js";

router.post("/register", async (req, res) => {
	const { first_name, last_name, email, password, age } = req.body;

	if (!first_name || !last_name || !email || !password || !age) {
		return res.status(400).render("register", { message: "Todos los campos son requeridos" });
	}

	try {
		const existeUsuario = await UserModel.findOne({ email });

		if (existeUsuario) {
			return res.status(400).render("register", { message: "El email ya esta en uso" });
		}

		const usuario = await UserModel.create({
			first_name,
			last_name,
			email,
			password: createHash(password),
			age,
		});

		const token = generateToken({
			first_name: usuario.first_name,
			last_name: usuario.last_name,
			email: usuario.email,
			role: usuario.role,
			age: usuario.age,
		});

		res.cookie("coderCookieToken", token, {
			maxAge: 60 * 60 * 1000,
			httpOnly: true,
		});

		res.status(201).redirect("/profile");
	} catch (error) {
		res.status(500).send("Error interno del server");
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	console.log(email);
	console.log(password);

	if (!email || !password) {
		return res.status(400).render("login", { message: "Usuario y contraseña requeridos" });
	}

	try {
		const usuario = await UserModel.findOne({ email: email });

		if (!usuario) {
			return res.status(404).render("login", { message: "Usuario no encontrado" });
		}

		if (!isValidPassword(password, usuario)) {
			return res.status(401).render("login", { message: "Contraseña incorrecta" });
		}

		const token = generateToken({
			first_name: usuario.first_name,
			last_name: usuario.last_name,
			email: usuario.email,
			role: usuario.role,
			age: usuario.age,
		});

		res.cookie("coderCookieToken", token, {
			maxAge: 60 * 60 * 1000,
			httpOnly: true,
		});

		res.status(200).redirect("/profile");
	} catch (error) {
		res.status(500).send(`Error interno del server ${error}`);
	}
});

router.get("/logout", async (req, res) => {
	try {
		res.clearCookie("coderCookieToken");
		res.redirect("/");
	} catch (error) {
		res.send(error);
	}
});

export default router;
