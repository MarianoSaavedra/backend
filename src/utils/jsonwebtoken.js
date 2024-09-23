import jwt from "jsonwebtoken";

const claveSecreta = "coderhouse";

const generateToken = (user) => {
	const token = jwt.sign(user, claveSecreta, { expiresIn: "24h" });
	return token;
};

export default generateToken;
