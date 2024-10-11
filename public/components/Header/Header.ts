import BaseComponent from '../BaseComponent';

/**
 * Class of header
 */
export default class Header extends BaseComponent {
	/**
	 * Instance of Header
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		super(config, parent);
	}

	/**
	 * Rendering header with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render() {
		const template = Handlebars.templates['Header.hbs'];
		const html = template(this.config);
		if (this.parent) {
			this.parent.htmlElement.innerHTML += html;
		}
		return html;
	}
}
