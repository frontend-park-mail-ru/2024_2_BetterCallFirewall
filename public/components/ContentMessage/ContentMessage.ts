// import BaseComponent, {
// 	IBaseComponent,
// 	IBaseComponentConfig,
// } from '../BaseComponent';

// export interface IContentMessageConfig extends IBaseComponentConfig {
// 	text: string;
// }

// export interface IContentMessage extends IBaseComponent {}

// export class ContentMessage extends BaseComponent implements IContentMessage {
// 	/**
// 	 * Creates instance of ContentMessage
// 	 * @param {IContentMessageConfig} config
// 	 * @param {IBaseComponent} parent
// 	 */
// 	constructor(config: IContentMessageConfig, parent: IBaseComponent) {
// 		super(config, parent);
// 	}

// 	/**
// 	 * Renders message
// 	 * @returns {string} - HTML element
// 	 */
// 	render(): string {
// 		const template = Handlebars.templates['ContentMessage.hbs'];
// 		const html = template(this._config);
// 		this._parent?.htmlElement.insertAdjacentHTML('beforeend', html);
// 		return html;
// 	}

// 	update(data: IContentMessageConfig): void {
// 		this._config = data;
// 	}
// }

import Component, { ComponentConfig } from '../Component';

export interface ContentMessageConfig extends ComponentConfig {
	text: string;
}

export class ContentMessage extends Component {
	/**
	 * Creates instance of ContentMessage
	 * @param {ContentMessageConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: ContentMessageConfig, parent: Component) {
		super(config, parent);
	}

	/**
	 * Renders message
	 * @returns {string} - HTML element
	 */
	render(): string {
		this._prerender();
		return this._render('ContentMessage');
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this._templateContext, ...this._config };
	}
}
