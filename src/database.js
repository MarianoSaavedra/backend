import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDataBase = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Conectado a la base de datos");
	} catch (error) {
		console.error("Hubo un error con la base de datos:", error.message);
	}
};

connectToDataBase();
