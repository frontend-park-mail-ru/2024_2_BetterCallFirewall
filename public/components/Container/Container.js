export default class Container {
	#config;
	#parent;
	#children = {};
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
			`div[data-section=${this.#config.key}]`,
		);
	}
	render() {
		const template = Handlebars.templates['Container.hbs'];
		const html = template(this.#config);
		this.#parent.insertAdjacentHTML('beforeend', html);
		return html;
	}
	remove() {
		Object.keys(this.#children).forEach((key) => {
			this.#children[key].remove();
		});
		this.#parent.removeChild(this.htmlElement);
	}
}
