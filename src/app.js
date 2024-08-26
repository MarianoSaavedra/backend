//IMPORTAMOS EXPRESS - EXPRESS-HANDLEBARS - PRODUCTSROUTER - CARTSROUTER - VIEWSROUTER - BASE DE DATOS -
import express from "express";
import exphbs from "express-handlebars";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import ProductManager from "./dao/db/product-manager-db.js";
import { Server } from "socket.io";
import "./database.js";

//CONFIGURACION SERVIDOR EXPRESS
const app = express();
const PUERTO = 8080;

//CONFIGURACION EXPRESS-HANDLEBARS COMO MOTOR DE PLANTILLAS
app.engine(
	"handlebars",
	exphbs.engine({
		runtimeOptions: {
			allowProtoPropertiesByDefault: true,
		},
	})
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//MIDDLEWARE PARA PARSEO DE JSON - FORMULARIOS Y ARCHIVOS ESTATICOS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//CONFIGURACION DE RUTAS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//INICIALIZACION DEL PRODUCTMANAGER
const manager = new ProductManager();

//INICIANDO EL SERVIDOR
const httpServer = app.listen(PUERTO, () => {
	console.log(`Escuchando en el puerto http://localhost:${PUERTO}`);
});

//CONFIGURACION SOCKET.IO
const io = new Server(httpServer);

io.on("connection", async (socket) => {
	console.log("Un cliente se conecto");
	socket.on("saludo", (data) => {
		console.log(data);
	});

	socket.emit("productos", await manager.getProducts());

	socket.on("addProduct", async (producto) => {
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
