import { Component, ComponentConfig } from '../Component';

export interface FormLinkConfig extends ComponentConfig {
	text: string;
	href: string;
}

export class FormLink extends Component {
	protected override _config: FormLinkConfig;

	/**
	 *
	 * @param {FormLinkConfig} config
	 * @param {Component} parent
	 */
	constructor(config: FormLinkConfig, parent: Component) {
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
		return this._render('FormLink.hbs');
	}
}
