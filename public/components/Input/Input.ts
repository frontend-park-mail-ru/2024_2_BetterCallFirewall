// import BaseComponent, {
// 	IBaseComponent,
// 	IBaseComponentConfig,
// } from '../BaseComponent';

import Component, { ComponentConfig } from '../Component';

// export interface IInputConfig extends IBaseComponentConfig {
// 	name: string;
// 	placeholder?: string;
// 	text?: string;
// 	accept?: string;
// 	extra?: string;
// 	type: string;
// }

// export interface IInput extends IBaseComponent {}

// /**
//  * Class of input
//  */
// export class Input extends BaseComponent implements IInput {
// 	protected override _config: IInputConfig | null;

// 	/**
// 	 * Instance of Input
// 	 *
// 	 * @param {IInputConfig} config
// 	 * @param {IBaseComponent} parent
// 	 */
// 	constructor(config: IInputConfig, parent: IBaseComponent | null = null) {
// 		super(config, parent);
// 		this._config = config;
// 	}

// 	/**
// 	 * Rendering input with handlebars
// 	 *
// 	 * @returns {string} - generated HTML element of input
// 	 */
// 	render(show: boolean = true): string {
// 		this._prerender();
// 		return this._render('Input.hbs', show);
// 	}

// 	protected _prerender(): void {
// 		super._prerender();
// 		this._templateContext = this.config;
// 	}
// }

// Handlebars.registerHelper('eq', function (arg1, arg2) {
// 	return arg1 === arg2;
// });

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
