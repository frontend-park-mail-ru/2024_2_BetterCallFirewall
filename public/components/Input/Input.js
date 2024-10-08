import BaseComponent from '../BaseComponent.js';

/**
 * Class of input
 */
export default class Input extends BaseComponent {
	/**
	 * Instance of Input
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		super(config, parent);
		this.config.className = 'input-block';
	}

	/**
	 * Rendering input with handlebars
	 *
	 * @returns {string} - generated HTML element of input
	 */
	render() {
		const template = Handlebars.templates['Input.hbs'];
		const html = template(this.config);
		return html;
	}
}
