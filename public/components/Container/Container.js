import BaseComponent from '../BaseComponent.js';

/**
 * class of Container
 */
export default class Container extends BaseComponent {
	/**
	 * Instance of Container
	 *
	 * @param {Object} config
	 * @param {BaseComponent} parent
	 */
	constructor(config, parent) {
		super(config, parent);
	}

	/**
	 * Rendering Container with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render() {
		const template = Handlebars.templates['Container.hbs'];
		const html = template(this.config);
		this.parent.htmlElement.insertAdjacentHTML('beforeend', html);
		return html;
	}
}
