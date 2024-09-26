export default class User {
	id;
	email;
	firstName;
	lastName;
	constructor(config) {
		this.id = config.id;
		this.email = config.email;
		this.firstName = config.firstName;
		this.lastName = config.lastName;
	}
}
