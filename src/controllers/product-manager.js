const fs = require("fs").promises;

class ProductManager {
	constructor(path) {
		this.products = [];
		this.path = path;
	}

	//STATIC
	static ultId = 0;

	//AGREGAR UN PRODUCTO
	async addProduct({ title, description, price, thumbnails, code, stock, category }) {
		let respuesta;

		const arrayProducts = JSON.parse((await fs.readFile(this.path, "utf-8")) || "[]");

		if (!title || !description || !price || !code || !stock || !category) {
			return (respuesta = "Todos los campos son obligatorios");
		}
		if (arrayProducts.some((item) => item.code === code)) {
			return (respuesta = "El codigo esta repetido");
		}

		const nuevoProducto = {
			title,
			description,
			price,
			thumbnails: thumbnails || [],
			code,
			stock,
			status: true,
			category,
		};

		nuevoProducto.id = ++ProductManager.ultId;

		arrayProducts.push(nuevoProducto);

		await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));

		return (respuesta = "Producto agregado correctamente");
	}

	async getProducts() {
		const arrayProducts = JSON.parse((await fs.readFile(this.path, "utf-8")) || "[]");

		return arrayProducts;
	}

	async getProductsById(id) {
		const arrayProducts = JSON.parse((await fs.readFile(this.path, "utf-8")) || "[]");

		let productoBuscado = await arrayProducts.find((item) => item.id === id);

		return productoBuscado || "Not Found";
	}

	async updateProductById(id, nuevosDatos) {
		const arrayProducts = JSON.parse((await fs.readFile(this.path, "utf-8")) || "[]");

		let productoIndex = await arrayProducts.findIndex((item) => item.id === parseInt(id));

		if (productoIndex !== -1) {
			if (arrayProducts.some((item) => item.code === nuevosDatos.code)) {
				return "Recorda que el codigo no puede repetirse";
			} else {
				arrayProducts[productoIndex] = {
					...arrayProducts[productoIndex],
					...nuevosDatos,
				};

				await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
				return "Producto actualizado";
			}
		} else {
			return "El producto no existe";
		}
	}

	async deleteProductById(id) {
		const arrayProducts = JSON.parse((await fs.readFile(this.path, "utf-8")) || "[]");

		let productoIndex = await arrayProducts.findIndex((item) => item.id === parseInt(id));

		if (productoIndex !== -1) {
			arrayProducts.splice(productoIndex, 1);
			await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
			return "Producto eliminado correctamente";
		} else {
			return "El producto no existe";
		}
	}
}

module.exports = ProductManager;
