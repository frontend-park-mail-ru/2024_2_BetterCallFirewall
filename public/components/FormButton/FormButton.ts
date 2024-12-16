import { Component, ComponentConfig } from '../Component';

export interface FormButtonConfig extends ComponentConfig {
	text: string;
}

/**
 * Class for form button
 */
export class FormButton extends Component {
	protected override _config: FormButtonConfig;

	/**
	 * Instance of FormButton
	 *
	 * @param {FormButtonConfig} config
	 * @param {Component} parent
	 */
	constructor(config: FormButtonConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	/**
	 * Rendering form button with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render(): string {
		this._prerender();
		return this._render('FormButton.hbs');
	}
}
