// import BaseComponent, {
// 	IBaseComponent,
// 	IBaseComponentConfig,
// } from '../BaseComponent';

import Component, { ComponentConfig } from '../Component';

// export interface IFormLinkConfig extends IBaseComponentConfig {
// 	text: string;
// 	href: string;
// }

// export interface IFormLink extends IBaseComponent {}

// export class FormLink extends BaseComponent implements IFormLink {
// 	protected override _config: IFormLinkConfig | null;

// 	/**
// 	 *
// 	 * @param {IFormLinkConfig} config
// 	 * @param {IBaseComponent} parent
// 	 */
// 	constructor(config: IFormLinkConfig, parent: IBaseComponent | null = null) {
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
// 		return this._render('FormLink.hbs', show);
// 	}

// 	protected _prerender(): void {
// 		super._prerender();
// 		this._templateContext = this.config;
// 	}
// }

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
