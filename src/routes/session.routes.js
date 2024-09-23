import { Router } from "express";
const router = Router();
import UserModel from "../dao/models/users.models.js";
import { createHash, isValidPassword } from "../utils/utils.js";

import passport from "passport";
import generateToken from "../utils/jsonwebtoken.js";

router.post("/register", async (req, res) => {
	const { first_name, last_name, email, password, age } = req.body;

	try {
		const existeUsuario = await UserModel.findOne({ email });

		if (existeUsuario) {
			return res.status(400).send("El email ya esta en uso");
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
		});

		res.cookie("coderCookie", token, {
			maxAge: 86400000,
			httpOnly: true,
		});

		res.redirect("/profile");
		// res.status(201).send({ message: "Usuario creado con exito", token });
	} catch (error) {
		res.status(500).send("Error interno del server");
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const usuario = UserModel.findOne({ email });

		if (!usuario) {
			return res.send("No existe el usuario");
		}

		if (!isValidPassword(password, usuario)) {
			return res.send("Contraseña incorrecta");
		}

		const token = generateToken({
			first_name: usuario.first_name,
			last_name: usuario.last_name,
			email: usuario.email,
		});

		res.cookie("coderCookie", token, {
			maxAge: 86400000,
			httpOnly: true,
		});

		res.send({ message: "Login correcto", token });
	} catch (error) {
		res.status(500).send("Error interno del server");
	}
});

export default router;
