const express = require("express");
const app = express();
const PUERTO = 8080;

const productsRouter = require("./routes/products.routes.js");
const cartsRouter = require("./routes/carts.routes.js");

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PUERTO, () => {
	console.log(`Escuchando en el puerto http://localhost:${PUERTO}`);
});
