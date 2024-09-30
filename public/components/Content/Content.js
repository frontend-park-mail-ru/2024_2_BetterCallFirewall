/**
 * Class of Content
 */
export default class Content {
	#config;
	#parent;
	/**
	 * Instance of Content
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
	}
	/**
	 * Getting html element on key from config
	 */
	get htmlElement() {
		return this.#parent.querySelector(
			`div[data-section=${this.#config.key}]`,
		);
	}
	/**
	 * Rendering content with handlebars
	 * 
	 * @returns {string} - generated HTML element
	 */
	render() {
		const template = Handlebars.templates['Content.hbs'];
		const html = template(this.#config);
		if (this.#parent) {
			this.#parent.innerHTML += html;
		}
		return html;
	}
}
