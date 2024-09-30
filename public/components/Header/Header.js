/**
 * Class of header
 */
export default class Header {
	#config;
	#parent;
	#handlers = {};
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
		return this.#parent.querySelector(
			`div[data-section="${this.#config.key}"]`,
		);
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
	 * add event handler on target
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
	/**
	 * Removing elenment of header and event listeners
	 */
	remove() {
		Object.entries(this.#handlers).forEach(([, obj]) => {
			obj.target.removeEventListener(obj.event, obj.handler);
		});
		this.htmlElement.remove();
	}
}

