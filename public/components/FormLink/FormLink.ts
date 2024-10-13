import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IFormLinkConfig extends IBaseComponentConfig {
	text: string;
	href: string;
}

export interface IFormLink extends IBaseComponent {}

export class FormLink extends BaseComponent implements IFormLink {
	/**
	 *
	 * @param {IFormLinkConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IFormLinkConfig, parent: IBaseComponent) {
		super(config, parent);
	}

	/**
	 * Rendering form button with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render(): string {
		const template = Handlebars.templates['FormLink.hbs'];
		const html = template(this.config);
		if (this.parent) {
			this.parent.htmlElement.insertAdjacentHTML('beforeend', html);
		}
		return html;
	}
}
