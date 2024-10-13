import BaseComponent, { IBaseComponent, TConfig } from '../BaseComponent';

export interface IContentMessageConfig extends TConfig {
	text: string;
}

export interface IContentMessage extends IBaseComponent {}

export class ContentMessage extends BaseComponent implements IContentMessage {
	/**
	 * Creates instance of ContentMessage
	 * @param {IContentMessageConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IContentMessageConfig, parent: IBaseComponent) {
		super(config, parent);
	}

	/**
	 * Renders message
	 * @returns {string} - HTML element
	 */
	render(): string {
		const template = Handlebars.templates['ContentMessage.hbs'];
		const html = template(this.config);
		this.parent?.htmlElement.insertAdjacentHTML('beforeend', html);
		return html;
	}
}
