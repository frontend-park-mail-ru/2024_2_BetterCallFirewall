/**
 * Class for form button
 */
export default class FormButton {
	#config;
	#className;
	#handlers = {};
	#parent;
	/**
	 * Instance of FormButton
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
		this.#className = 'form-button';
	}

	set parent(parent) {
		this.#parent = parent;
	}
	/**
	 * Getting html element
	 */
	get htmlElement() {
		return this.#parent.querySelector(
			`button[data-section="${this.#config.section}"`,
		);
	}

	/**
	 * Rendering form button with handlebars
	 * 
	 * @returns {string} - generated HTML element
	 */
	render() {
		const template = Handlebars.templates['FormButton.hbs'];
		const html = template({
			...this.#config,
			className: this.#className,
		});
		return html;
	}

	/**
	 * Adding event handler
	 * 
	 * @param {string} event - some event
	 * @param {Function} handler - function handler of event
	 */
	addHandler(event, handler) {
		this.htmlElement.addEventListener(event, handler);
		this.#handlers[`${event}`] = {
			event,
			handler,
		};
	}

	/**
	 * Removing all handlers from button
	 */
	remove() {
		Object.entries(this.#handlers).forEach(([, obj]) => {
			this.htmlElement.removeEventListener(`${obj.event}`, obj.handler);
		});
	}
}
