import ProductModel from "../models/products.models.js";

class ProductManager {
	// AGREGAR UN PRODUCTO
	async addProduct({ title, description, price, thumbnails, code, stock, category }) {
		try {
			const existeCodigo = await ProductModel.findOne({ code: code });

			if (existeCodigo) {
				return console.log("El codigo del producto ingresado ya existe");
			}

			const newProduct = new ProductModel({
				title,
				description,
				price,
				thumbnails: thumbnails || [],
				code,
				stock,
				status: true,
				category,
			});

			await newProduct.save();
			return console.log("Producto agregado correctamente");
		} catch (error) {
			return console.error("Error agregando el producto", error);
		}
	}

	// BUSCAR PRODUCTOS //
	async getProducts({ limit, page, sort, query }) {
		const options = {
			page,
			limit,
			sort: {
				price: sort,
			},
		};

		try {
			let products;
			if (!query) {
				products = await ProductModel.paginate({}, options);
			} else {
				products = await ProductModel.paginate({ category: query }, options);
			}

			return products;
		} catch (error) {
			return console.log("Error interno del servidor");
		}
	}

	async getProductsById(id) {
		try {
			const productoBuscado = await ProductModel.findById(id);

			if (!productoBuscado) {
				return console.log("Producto no encontrado");
			}
			return productoBuscado;
		} catch (error) {
			return console.log("Error interno del servidor");
		}
	}

	async updateProductById(id, nuevosDatos) {
		const productoActualizado = await ProductModel.findByIdAndUpdate(id, nuevosDatos);

		if (!productoActualizado) {
			return console.log("No existe el producto que queres actualizar");
		} else {
			return productoActualizado;
		}
	}

	async deleteProductById(id) {
		try {
			const productoEliminado = ProductModel.findByIdAndDelete(id);
			if (!productoEliminado) {
				return console.log("El producto no existe");
			} else {
				return productoEliminado;
			}
		} catch (error) {
			return console.log("Ups, error inesperado");
		}
	}
}

export default ProductManager;
