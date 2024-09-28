/**
 * Class of input 
 */
export default class Input {
	#config;
	#parent;

	/**
	 * Instance of Input
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
		this.#config.className = 'input-block';
	}

	set parent(parent) {
		this.#parent = parent;
	}

	/**
	 * Getting html element
	 */
	get htmlElement() {
		return this.#parent.querySelector(
			`div[data-section="${this.#config.section}"]`,
		);
	}

	/**
	 * Rendering input with handlebars
	 * 
	 * @returns {string} - generated HTML element of input
	 */
	render() {
		const template = Handlebars.templates['Input.hbs'];
		const html = template(this.#config);
		return html;
	}

	/**
	 * Removing input from parent element
	 */
	remove() {
		this.#parent.removeChild(this.htmlElement);
	}
}
