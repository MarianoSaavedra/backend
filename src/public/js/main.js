const socket = io();

const contenedor = document.getElementById("boxProductos");
const form = document.getElementById("formNewProduct");

socket.on("connect", () => {
	console.log("Conectado al servidor");
});

socket.on("productos", (productos) => {
	renderProducts(productos);
});

const eliminarProducto = (id) => {
	socket.emit("eliminarProducto", id);
};

const addProduct = (producto) => {
	socket.emit("addProduct", producto);
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const title = document.getElementById("title").value;
	const description = document.getElementById("description").value;
	const price = document.getElementById("price").value;
	const code = document.getElementById("code").value;
	const stock = document.getElementById("stock").value;
	const category = document.getElementById("category").value;

	const newProduct = {
		title,
		description,
		price,
		code,
		stock,
		category,
	};

	addProduct(newProduct);
	form.reset();
});

const renderProducts = (productos) => {
	contenedor.innerHTML = "";
	productos.forEach((producto) => {
		const card = document.createElement("div");
		card.innerHTML = `<div>
					<h3>${producto.title}</h3>
					<img src="https://picsum.photos/200/200" alt="Imagen Random" />
					<p>${producto.price}</p>
					<p>${producto.description}</p>
					<p>${producto.category}</p>
					<p>${producto.code}</p>
					<p>${producto.stock}</p>
					<button>Eliminar</button>
				</div>`;
		contenedor.appendChild(card);
		card.querySelector("button").addEventListener("click", () => {
			eliminarProducto(producto.id);
		});
	});
};
