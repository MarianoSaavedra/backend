const fs = require("fs").promises;

class ProductManager {
	constructor(path) {
		this.products = [];
		this.path = path;
	}

	//STATIC
	static ultId = 0;

	// AGREGAR UN PRODUCTO //
	async addProduct({ title, description, price, thumbnails, code, stock, category }) {
		try {
			const data = await fs.readFile(this.path, "utf-8");
			const arrayProducts = JSON.parse(data || "[]");

			if (!title || !description || !price || !code || !stock || !category) {
				return "Todos los campos son obligatorios";
			}
			if (arrayProducts.some((item) => item.code === code)) {
				return "El codigo esta repetido";
			}

			const newProduct = {
				id: ++ProductManager.ultId,
				title,
				description,
				price,
				thumbnails: thumbnails || [],
				code,
				stock,
				status: true,
				category,
			};

			arrayProducts.push(newProduct);

			await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));

			return "Producto agregado correctamente";
		} catch (error) {
			console.error("Error agregando el producto", error);
			return "Error agregando el producto";
		}
	}

	// BUSCAR PRODUCTOS //
	async getProducts() {
		try {
			const data = await fs.readFile(this.path, "utf-8");
			const arrayProducts = JSON.parse(data || "[]");

			return arrayProducts;
		} catch (error) {
			console.error("Error al leer el archivo", error);
		}
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
