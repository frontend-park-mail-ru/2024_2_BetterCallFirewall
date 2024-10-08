/**
 * Class of menu link
 */
export default class MenuLink {
	#parent;
	#config;
	/**
	 * Instance of MenuLink
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent - parent element
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
		this.#config['className'] = 'menu-link';
	}

	/**
	 * Setting parent to element
	 * @param {HTMLElement} parent
	 */
	set parent(parent) {
		this.#parent = parent;
	}

	/**
	 * Getting html element which contains the form
	 *
	 * @returns {HTMLElement} - HTML element of form
	 */
	get htmlElement() {
		return this.#parent.querySelector(
			`a[data-section="${this.#config.key}"]`,
		);
	}
	/**
	 * Rendering menu link with handlebars
	 *
	 * @returns {string} - generated HTML code
	 */
	render() {
		const template = Handlebars.templates['MenuLink.hbs'];
		const html = template(this.#config);
		if (this.#parent) {
			this.#parent.innerHTML += html;
		}
		return html;
	}
	/**
	 * Removing MenuLink element
	 */
	remove() {
		this.htmlElement.remove();
	}
}
