/**
 * class of Container
 */
export default class Container {
	#config;
	#parent;
	#children = {};
	#handlers = {};
	/**
	 * Instance of Container
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
	}

	/**
	 * @returns {HTMLElement}
	 */
	get htmlElement() {
		return this.#parent.querySelector(
			`div[data-section=${this.#config.key}]`,
		);
	}

	/**
	 * @returns {string}
	 */
	get section() {
		return this.#config.section;
	}

	/**
	 * Rendering Container with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render() {
		const template = Handlebars.templates['Container.hbs'];
		const html = template(this.#config);
		this.#parent.insertAdjacentHTML('beforeend', html);
		return html;
	}

	/**
	 * Removing Container and child elements
	 */
	remove() {
		this.removeHandlers();
		Object.keys(this.#children).forEach((key) => {
			this.#children[key].remove();
		});
		this.#parent.removeChild(this.htmlElement);
	}

	/**
	 *
	 * @param {HTMLElement} target
	 * @param {string} event
	 * @param {function(Event)} handler
	 */
	addHandler(target, event, handler) {
		target.addEventListener(event, handler);
		this.#handlers[`${target.className}-${event}`] = {
			target,
			event,
			handler,
		};
	}

	/**
	 * Removes all handlers
	 */
	removeHandlers() {
		Object.entries(this.#handlers).forEach(
			([key, { target, event, handler }]) => {
				target.removeEventListener(event, handler);
				delete this.#handlers[key];
			},
		);
	}

	/**
	 * Append child to container
	 * @param {Object} child
	 */
	addChild(child) {
		this.#children[child.section] = child;
	}
}
