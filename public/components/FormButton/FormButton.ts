// import BaseComponent, {
// 	IBaseComponent,
// 	IBaseComponentConfig,
// } from '../BaseComponent';

import Component, { ComponentConfig } from '../Component';

// export interface IFormButtonConfig extends IBaseComponentConfig {
// 	text: string;
// }

// export interface IFormButton extends IBaseComponent {}

// /**
//  * Class for form button
//  */
// export class FormButton extends BaseComponent implements IFormButton {
// 	protected override _config: IFormButtonConfig | null;

// 	/**
// 	 * Instance of FormButton
// 	 *
// 	 * @param {IFormButtonConfig} config
// 	 * @param {IBaseComponent} parent
// 	 */
// 	constructor(
// 		config: IFormButtonConfig,
// 		parent: IBaseComponent | null = null,
// 	) {
// 		super(config, parent);
// 		this._config = config;
// 	}

// 	/**
// 	 * Rendering form button with handlebars
// 	 *
// 	 * @returns {string} - generated HTML element
// 	 */
// 	render(show: boolean = true): string {
// 		this._prerender();
// 		return this._render('FormButton.hbs', show);
// 	}

// 	protected _prerender(): void {
// 		super._prerender();
// 		this._templateContext = this.config;
// 	}
// }

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
