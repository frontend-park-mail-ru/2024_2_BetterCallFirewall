export default class Header {
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
	}
	get htmlElement() {
		return this.#parent.querySelector(`div[dataset=${this.#config.key}]`);
	}
	render() {
		const template = Handlebars.templates['Header.hbs'];
		const html = template({ ...this.#config });
		if (this.#parent) {
			this.#parent.innerHTML += html;
		}
		return html;
	}
	remove() {
		this.htmlElement.remove();
	}
}
