export default class Header {
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
			`div[data-section="${this.#config.key}"]`,
		);
	}
	render() {
		const template = Handlebars.templates['Header.hbs'];
		const html = template({ ...this.#config });
		if (this.#parent) {
			this.#parent.innerHTML += html;
		}
		return html;
	}
	/**
	 *
	 * @param {HTMLElement} target
	 * @param {string} event
	 * @param {(event) => void} handler
	 */
	addHandler(target, event, handler) {
		this.#handlers[`${target.className}-${event}`] = {
			target,
			event,
			handler,
		};
		target.addEventListener(event, handler);
	}
	remove() {
		Object.entries(this.#handlers).forEach(([, obj]) => {
			obj.target.removeEventListener(obj.event, obj.handler);
		});
		this.htmlElement.remove();
	}
}
