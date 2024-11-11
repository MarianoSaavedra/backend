import ProductModel from "./models/product.models.js";

class ProductDao {
	async findById(id) {
		return await ProductModel.findById(id);
	}

	async find(limit, page, sort, query) {
		const options = {
			page,
			limit,
			sort: {
				price: sort,
			},
		};
		let products;
		if (!query) {
			products = await ProductModel.paginate({}, options);
		} else {
			products = await ProductModel.paginate({ category: query }, options);
		}
		return products;
	}

	async findByCode(code) {
		return await ProductModel.findOne({ code: code });
	}

	async save(productData) {
		const product = new ProductModel(productData);
		return await product.save();
	}

	async update(id, productData) {
		return await ProductModel.findByIdAndUpdate(id, productData);
	}

	async delete(id) {
		return await ProductModel.findByIdAndDelete(id);
	}
}

export default ProductDao;
