export default class MenuLink {
	#parent;
	#config;
	/**
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
		this.#config['className'] = 'menu-link';
	}
	set parent(parent) {
		this.#parent = parent;
	}
	get htmlElement() {
		return this.#parent.querySelector(
			`a[data-section="${this.#config.key}"]`,
		);
	}
	render() {
		const template = Handlebars.templates['MenuLink.hbs'];
		const html = template(this.#config);
		if (this.#parent) {
			this.#parent.innerHTML += html;
		}
		return html;
	}
	remove() {
		this.htmlElement.remove();
	}
}
