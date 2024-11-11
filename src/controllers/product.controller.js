import ProductDao from "../dao/product.dao.js";
import ProductService from "../services/product.service.js";

const productService = new ProductService();
const productDao = new ProductDao();

class ProductController {
	async getProducts(req, res) {
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const sort = req.query.sort === "desc" ? -1 : 1;
		const query = req.query.query;

		try {
			const products = await productService.getProducts(limit, page, sort, query);
			res.json({
				status: "200",
				payload: products.docs,
				totalPages: products.totalPages,
				prevPage: products.prevPage,
				nextPage: products.nextPage,
				page: products.currentPage,
				hasPrevPage: products.hasPrevPage,
				hasNextPage: products.hasNextPage,
				prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}` : null,
				nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}` : null,
			});
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor ", error: error });
		}
	}

	async getProductById(req, res) {
		const { id } = req.params;
		try {
			const product = await productService.getProductById(id);
			if (!product) return res.status(404).send("Producto no encontrado");
			res.status(200).send({ message: "Producto encontrado", product });
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor ", error: error });
		}
	}

	async createProduct(req, res) {
		const { title, description, price, code, stock, category } = req.body;
		if (!title || !description || !price || !code || !stock || !category) {
			return res.status(400).send({ message: "Todos los campos obligatorios deben estar presentes." });
		}

		if (isNaN(price)) {
			return res.status(400).send({ message: "El campo price debe ser un numero" });
		}

		const existe = await productDao.findByCode(req.body.code);
		if (existe) return res.status(409).send({ message: "El codigo del producto ya existe" });

		try {
			const product = await productService.createProduct(req.body);
			res.status(201).send({ message: "Producto agregado correctamente", product });
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor creando el producto", error: error });
		}
	}

	async updateProductById(req, res) {
		const { id } = req.params;
		try {
			const updateProduct = await productService.updateProduct(id, req.body);
			if (!updateProduct) return res.status(404).send("Producto no encontrado");
			res.status(200).send({ message: "Producto actualizado correctamente" });
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor al actualizar el producto ", error: error });
		}
	}

	async deleteProductById(req, res) {
		const { id } = req.params;
		try {
			const deleteProduct = await productService.deleteProduct(id);
			if (!deleteProduct) return res.status(404).send("Producto no encontrado");
			res.status(200).send({ message: "Producto eliminado" });
		} catch (error) {
			res.status(500).send({ message: "Error interno en el servidor al eliminar el producto ", error: error });
		}
	}
}

export default ProductController;
