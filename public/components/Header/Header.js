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
		console.log(this.#config);
		const html = template({ ...this.#config });
		if (this.#parent) {
			// Из-за этого нельзя встроить картинку через шаблон
			this.#parent.innerHTML += html;
		}
		return html;
	}
	remove() {
		this.htmlElement.remove();
	}
}
