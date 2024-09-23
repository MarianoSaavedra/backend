// IMPORTACIONES DE MÓDULOS Y RUTAS NECESARIAS
import express from "express"; // Framework para crear servidores web
import exphbs from "express-handlebars"; // Motor de plantillas para renderizar vistas
import cookieParser from "cookie-parser"; // Middleware para manejar cookies
import passport from "passport"; // Módulo para autenticación
import initPassport from "./config/passport.config.js"; // Configuración de Passport
import "./database.js"; // Conexión a la base de datos

// RUTAS
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import sessionRouter from "./routes/session.routes.js";

// DAO para gestionar productos en la base de datos
import ProductManager from "./dao/db/product-manager-db.js";

// Socket.io para comunicaciones en tiempo real
import { Server } from "socket.io";

// CONFIGURACIÓN DEL SERVIDOR EXPRESS
const app = express();
const PUERTO = 8080;

// MIDDLEWARES
app.use(express.json()); // Parsear JSON en las peticiones
app.use(express.urlencoded({ extended: true })); // Parsear datos de formularios
app.use(cookieParser()); // Manejar cookies

// CONFIGURACIÓN DE RUTAS
app.use("/api/products", productsRouter); // Ruta para productos
app.use("/api/carts", cartsRouter); // Ruta para carritos
app.use("/api/sessions", sessionRouter); // Ruta para sesiones (autenticación)
app.use("/", viewsRouter); // Ruta para vistas

// CONFIGURACIÓN DE HANDLEBARS COMO MOTOR DE PLANTILLAS
app.engine(
	"handlebars",
	exphbs.engine({
		runtimeOptions: {
			allowProtoPropertiesByDefault: true, // Permitir propiedades prototipo (seguridad)
		},
	})
);
app.set("view engine", "handlebars"); // Definir Handlebars como motor de plantillas
app.set("views", "./src/views"); // Definir el directorio de vistas

// Inicializar Passport (gestión de autenticación)
app.use(passport.initialize());
initPassport();

// Servir archivos estáticos desde el directorio público
app.use(express.static("./src/public"));

// INICIALIZACIÓN DEL PRODUCTMANAGER
const manager = new ProductManager(); // Instancia para gestionar productos

// INICIANDO EL SERVIDOR HTTP
const httpServer = app.listen(PUERTO, () => {
	console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});

// CONFIGURACIÓN DE SOCKET.IO PARA COMUNICACIÓN EN TIEMPO REAL
const io = new Server(httpServer);

io.on("connection", async (socket) => {
	console.log("Un cliente se conectó");

	// Evento personalizado para recibir saludos desde el cliente
	socket.on("saludo", (data) => {
		console.log(data); // Mostrar saludo en consola
	});

	// Emitir la lista de productos al cliente cuando se conecte
	socket.emit("productos", await manager.getProducts());

	// Evento para agregar un nuevo producto
	socket.on("addProduct", async (producto) => {
		await manager.addProduct(producto); // Agregar producto a la base de datos
		socket.emit("productos", await manager.getProducts()); // Enviar lista actualizada
	});

	// Evento para eliminar un producto por ID
	socket.on("eliminarProducto", async (id) => {
		if (id) {
			await manager.deleteProductById(id); // Eliminar producto de la base de datos
			socket.emit("productos", await manager.getProducts()); // Enviar lista actualizada
		} else {
			console.error("El producto no existe"); // Manejo de error si no hay ID
		}
	});
});
