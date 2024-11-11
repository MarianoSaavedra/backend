import ProductDao from "../dao/product.dao.js";

const productDao = new ProductDao();

class ProductRepository {
	async createProduct(productData) {
		return await productDao.save(productData);
	}

	async getProductById(id) {
		return await productDao.findById(id);
	}

	async getProducts(limit, page, sort, query) {
		return await productDao.find(limit, page, sort, query);
	}

	async updateProduct(id, productData) {
		return await productDao.update(id, productData);
	}

	async deleteProduct(id) {
		return await productDao.delete(id);
	}
}

export default ProductRepository;
