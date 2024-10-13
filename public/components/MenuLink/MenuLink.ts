import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IMenuLinkConfig extends IBaseComponentConfig {
	text: string;
	href: string;
}

export interface IMenuLink extends IBaseComponent {}

/**
 * Class of menu link
 */
export class MenuLink extends BaseComponent implements IMenuLink {
	protected override config: IMenuLinkConfig | null;
	/**
	 * Instance of MenuLink
	 *
	 * @param {IMenuLinkConfig} config
	 * @param {IBaseComponent} parent - parent element
	 */
	constructor(config: IMenuLinkConfig, parent: IBaseComponent | null = null) {
		super(config, parent);
		this.config = config;
	}

	/**
	 * Rendering menu link with handlebars
	 *
	 * @returns {string} - generated HTML code
	 */
	render(): string {
		const template = Handlebars.templates['MenuLink.hbs'];
		const html = template(this.config);
		this.parent?.htmlElement.insertAdjacentHTML('beforeend', html);
		return html;
	}
}
