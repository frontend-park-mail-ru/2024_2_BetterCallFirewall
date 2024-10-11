import BaseComponent from '../BaseComponent';

export default class FormLink extends BaseComponent {
	/**
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		super(config, parent);
	}

	/**
	 * Rendering form button with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render() {
		const template = Handlebars.templates['FormLink.hbs'];
		const html = template(this.config);
		if (this.parent) {
			this.parent.insertAdjacentHTML('beforeend', html);
		}
		return html;
	}
}
