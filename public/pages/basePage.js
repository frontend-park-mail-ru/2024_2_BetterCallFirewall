// eslint-disable-next-line
import App from '../app.js';

export default class BasePage {
	#app;
	#structure = {};

	/**
	 *
	 * @param {App} app
	 */
	constructor(app) {
		this.#app = app;
	}

	/**
	 * @returns {App}
	 */
	get app() {
		return this.#app;
	}

	/**
	 * @returns {Object}
	 */
	get structure() {
		return this.#structure;
	}
}
