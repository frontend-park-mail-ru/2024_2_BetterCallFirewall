// eslint-disable-next-line

export default class BasePage {
	#app: any;
	#structure: Record<string, any> = {};

	/**
	 *
	 * @param {App} app
	 */
	constructor(app: any) {
		this.#app = app;
	}

	/**
	 * @returns {App}
	 */
	get app(): any {
		return this.#app;
	}

	/**
	 * @returns {Object}
	 */
	get structure(): Record<string, any> {
		return this.#structure;
	}
}
