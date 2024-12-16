import { Component, ComponentConfig } from '../Component';

export interface InputConfig extends ComponentConfig {
	name: string;
	placeholder?: string;
	text?: string;
	accept?: string;
	extra?: string;
	type: string;
}

/**
 * Class of input
 */
export class Input extends Component {
	protected override _config: InputConfig;

	/**
	 * Instance of Input
	 *
	 * @param {InputConfig} config
	 * @param {Component} parent
	 */
	constructor(config: InputConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	/**
	 * Rendering input with handlebars
	 *
	 * @returns {string} - generated HTML element of input
	 */
	render(): string {
		this._prerender();
		return this._render('Input.hbs');
	}
}

Handlebars.registerHelper('eq', function (arg1, arg2) {
	return arg1 === arg2;
});
