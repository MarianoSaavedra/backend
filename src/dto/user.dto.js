class UserDTO {
	constructor(user) {
		this.email = user.email;
		this.role = user.role;
		this.cartID = user.cartID;
	}
}

export default UserDTO;
