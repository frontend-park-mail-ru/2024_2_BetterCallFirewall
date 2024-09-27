/**
 * Class of header
 */
export default class Header {
	#config;
	#parent;
	/**
	 * Instance of Header
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
	}
	get htmlElement() {
		return this.#parent.querySelector(`div[dataset=${this.#config.key}]`);
	}
	/**
	 * Rendering header with handlebars
	 * 
	 * @returns {string} - generated HTML element 
	 */
	render() {
		const template = Handlebars.templates['Header.hbs'];
		const html = template({ ...this.#config });
		if (this.#parent) {
			this.#parent.innerHTML += html;
		}
		return html;
	}
	/**
	 * Removing element of header
	 */
	remove() {
		this.htmlElement.remove();
	}
}
