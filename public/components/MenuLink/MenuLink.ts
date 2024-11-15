import Component, { ComponentConfig } from '../Component';

// export interface IMenuLinkConfig extends IBaseComponentConfig {
// 	text: string;
// 	href: string;
// 	icon: string;
// 	active?: boolean;
// }

// export interface IMenuLink extends IBaseComponent {}

// /**
//  * Class of menu link
//  */
// export class MenuLink extends BaseComponent implements IMenuLink {
// 	protected override _config: IMenuLinkConfig | null;
// 	/**
// 	 * Instance of MenuLink
// 	 *
// 	 * @param {IMenuLinkConfig} config
// 	 * @param {IBaseComponent} parent - parent element
// 	 */
// 	constructor(config: IMenuLinkConfig, parent: IBaseComponent | null = null) {
// 		super(config, parent);
// 		this._config = config;
// 	}

// 	/**
// 	 * Rendering menu link with handlebars
// 	 *
// 	 * @returns {string} - generated HTML code
// 	 */
// 	render(show: boolean = true): string {
// 		this._prerender();
// 		return this._render('MenuLink.hbs', show);
// 	}

// 	update(data: IMenuLinkConfig): void {
// 		this._config = data;
// 	}

// 	protected _prerender(): void {
// 		super._prerender();
// 		this._templateContext = { ...this._config };
// 	}
// }

export interface IMenuLinkConfig extends ComponentConfig {
	text: string;
	href: string;
	icon: string;
	active?: boolean;
}

export interface IMenuLink extends Component {}

export default class MenuLink extends Component {
	protected _config: IMenuLinkConfig;

	constructor(config: IMenuLinkConfig, parent: Component | null = null) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('MenuLink.hbs');
	}
}
