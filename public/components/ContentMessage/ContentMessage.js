export default class ContentMessage {
	#config;
	#parent;
	/**
	 * Creates instance of ContentMessage
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
	}

	/**
	 * Returns html element of message
	 * @returns {HTMLElement}
	 */
	get htmlElement() {
		return this.#parent.querySelector(
			`div[data-section="${this.#config.section}"]`,
		);
	}

	/**
	 * Renders message
	 * @returns {string} - HTML element
	 */
	render() {
		const template = Handlebars.templates['ContentMessage.hbs'];
		const html = template(this.#config);
		this.#parent.insertAdjacentHTML('beforeend', html);
		return html;
	}

	/**
	 * Removes message
	 */
	remove() {
		this.#parent.removeChild(this.htmlElement);
	}
}
