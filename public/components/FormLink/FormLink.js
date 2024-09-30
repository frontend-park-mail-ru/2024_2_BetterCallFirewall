export default class FormLink {
	#config;
	#parent;
	#handlers = {};
	/**
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
	}

	/**
	 * Getting html element which contains the form
	 *
	 * @returns {HTMLElement} - HTML element of form
	 */
	get htmlElement() {
		return this.#parent.querySelector(
			`a[data-section="${this.#config.section}"]`,
		);
	}

	/**
	 * Setting parent to element
	 * @param {HTMLElement} parent
	 */
	set parent(parent) {
		this.#parent = parent;
	}

	/**
	 * Rendering form button with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render() {
		const template = Handlebars.templates['FormLink.hbs'];
		const html = template(this.#config);
		if (this.#parent) {
			this.#parent.insertAdjacentHTML('beforeend', html);
		}
		return html;
	}

	/**
	 * Adding event handler
	 *
	 * @param {string} event - some event
	 * @param {Function} handler - function handler of event
	 */
	addHandler(event, handler) {
		this.#handlers[`${this.#config.section}-${event}`] = {
			event,
			handler,
		};
		this.htmlElement.addEventListener(event, handler);
	}

	/**
	 * Removing element
	 */
	remove() {
		Object.entries(this.#handlers).forEach(([, obj]) => {
			this.htmlElement.removeEventListener(obj.event, obj.handler);
		});
		this.#parent.removeChild(this.htmlElement);
	}
}
