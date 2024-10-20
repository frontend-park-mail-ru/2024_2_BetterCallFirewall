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
	protected override _config: IFormLinkConfig | null;

	/**
	 *
	 * @param {IFormLinkConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IFormLinkConfig, parent: IBaseComponent | null = null) {
		super(config, parent);
		this._config = config;
	}

	/**
	 * Rendering form button with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render(): string {
		const template = Handlebars.templates['FormLink.hbs'];
		const html = template(this._config);
		if (this._parent) {
			this._parent.htmlElement.insertAdjacentHTML('beforeend', html);
		}
		return html;
	}

	update(data: IFormLinkConfig): void {
		this._config = data;
	}
}
