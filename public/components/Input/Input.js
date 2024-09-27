export default class Input {
	#config;
	#parent;

	/**
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

	get htmlElement() {
		return this.#parent.querySelector(
			`div[data-section="${this.#config.section}"]`,
		);
	}

	render() {
		const template = Handlebars.templates['Input.hbs'];
		const html = template(this.#config);
		return html;
	}

	remove() {
		this.#parent.removeChild(this.htmlElement);
	}
}
