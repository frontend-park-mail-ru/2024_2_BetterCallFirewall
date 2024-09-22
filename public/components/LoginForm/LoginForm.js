export default class LoginForm {
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
	render() {
		const template = Handlebars.templates['LoginForm.hbs'];
		const html = template(this.#config);
		this.#parent.insertAdjacentHTML('beforeend', html);
		return html;
	}
}
