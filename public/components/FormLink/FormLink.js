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

	get htmlElement() {
		return this.#parent.querySelector(
			`a[data-section="${this.#config.section}"]`,
		);
	}

	set parent(parent) {
		this.#parent = parent;
	}

	render() {
		const template = Handlebars.templates['FormLink.hbs'];
		const html = template(this.#config);
		if (this.#parent) {
			this.#parent.insertAdjacentHTML('beforeend', html);
		}
		return html;
	}

	addHandler(event, handler) {
		this.#handlers[`${this.#config.section}-${event}`] = {
			event,
			handler,
		};
		this.htmlElement.addEventListener(event, handler);
	}

	remove() {
		Object.entries(this.#handlers).forEach(([, obj]) => {
			this.htmlElement.removeEventListener(obj.event, obj.handler);
		});
		this.#parent.removeChild(this.htmlElement);
	}
}
