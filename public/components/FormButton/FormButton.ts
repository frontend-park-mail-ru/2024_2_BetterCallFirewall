import BaseComponent from '../BaseComponent';

/**
 * Class for form button
 */
export default class FormButton extends BaseComponent {
	#className;
	/**
	 * Instance of FormButton
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		super(config, parent);
		this.#className = 'form-button';
	}

	/**
	 * Rendering form button with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render() {
		const template = Handlebars.templates['FormButton.hbs'];
		const html = template({
			...this.config,
			className: this.#className,
		});
		return html;
	}
}
