export default class FormButton {
	#config;
	#className;
	#handlers = {};
	#parent;
	/**
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

	get htmlElement() {
		return this.#parent.querySelector(
			`button[data-section="${this.#config.section}"`,
		);
	}

	render() {
		const template = Handlebars.templates['FormButton.hbs'];
		const html = template({
			...this.#config,
			className: this.#className,
		});
		return html;
	}

	addHandler(event, handler) {
		this.htmlElement.addEventListener(event, handler);
		this.#handlers[`${event}`] = {
			event,
			handler,
		};
	}

	remove() {
		Object.entries(this.#handlers).forEach(([, obj]) => {
			this.htmlElement.removeEventListener(`${obj.event}`, obj.handler);
		});
	}
}
