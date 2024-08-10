console.log("Funciona");

const socket = io();

socket.emit("saludo", "Hola desde el cliente");

socket.on("saludo", (data) => {
	console.log(data);
});

socket.on("productos", (data) => {
	renderizarProductos(data);
});

const renderizarProductos = (productos) => {
	let contenedor = document.getElementById("boxProductos");
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

const eliminarProducto = (id) => {
	socket.emit("eliminarProducto", id);
};
