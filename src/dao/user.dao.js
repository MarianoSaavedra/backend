import UserModel from "./models/user.models.js";

class UserDao {
	async findById(id) {
		return await UserModel.findById(id);
	}
	async findOne(query) {
		return await UserModel.findOne(query);
	}

	async save(userData) {
		const user = new UserModel(userData);
		return await user.save();
	}
}

export default UserDao;
