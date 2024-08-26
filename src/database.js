import mongoose from "mongoose";

const connectToDataBase = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://marianomsv:coderhouse@cluster0.stq9t.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
		);
		console.log("Conectado a la base de datos");
	} catch (error) {
		console.error("Hubo un error con la base de datos:", error.message);
	}
};

connectToDataBase();
