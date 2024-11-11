import express from "express";
import exphbs from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import initPassport from "./config/passport.config.js";
import "./database.js";

import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import sessionRouter from "./routes/session.routes.js";

const app = express();
const PUERTO = process.env.PORT;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./src/public"));
app.use(passport.initialize());
initPassport();

// HANDLEBARS
app.engine(
	"handlebars",
	exphbs.engine({
		runtimeOptions: {
			allowProtoPropertiesByDefault: true, // Permitir propiedades prototipo (seguridad)
		},
	})
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// RUTAS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

app.listen(PUERTO, () => {
	console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
