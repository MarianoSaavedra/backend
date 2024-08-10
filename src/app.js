//CONFIGURACION EXPRESS
import express from "express";
const app = express();
const PUERTO = 8080;

//CONFIGURACION EXPRESS-HANDLEBARS
import { engine } from "express-handlebars";
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//CONFIGURACION DE ROUTES
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//IMPORTACION PRODUCT MANAGER
import ProductManager from "./controllers/product-manager.js";
const manager = new ProductManager("./src/data/products.json");

//ESCUCHANDO EL SERVIDOR
const httpServer = app.listen(PUERTO, () => {
	console.log(`Escuchando en el puerto http://localhost:${PUERTO}`);
});

//CONFIGURACION SOCKET.IO
import { Server } from "socket.io";

const io = new Server(httpServer);

io.on("connection", async (socket) => {
	console.log("Un cliente se conecto");
	socket.on("saludo", (data) => {
		console.log(data);
	});

	socket.emit("productos", await manager.getProducts());

	socket.on("addProduct", async (producto) => {
		console.log(producto);
		await manager.addProduct(producto);
		socket.emit("productos", await manager.getProducts());
	});

	socket.on("eliminarProducto", async (id) => {
		if (id) {
			await manager.deleteProductById(id);
			socket.emit("productos", await manager.getProducts());
		} else {
			console.error("El producto no existe");
		}
	});
});
