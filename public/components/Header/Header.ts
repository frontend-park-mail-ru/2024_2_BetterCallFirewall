import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

type Profile = {
	id: number;
	avatar: string;
};

export interface IHeaderConfig extends IBaseComponentConfig {
	profile: Profile;
}

export interface IHeader extends IBaseComponent {}

/**
 * Class of header
 */
export class Header extends BaseComponent implements IHeader {
	/**
	 * Instance of Header
	 *
	 * @param {IHeaderConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IHeaderConfig, parent: IBaseComponent) {
		super(config, parent);
	}

	/**
	 * Rendering header with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render(): string {
		this._prerender();
		return this._render('Header.hbs');
	}

	get logoutButtonHTML(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'.header__logout',
		) as HTMLElement;
		if (html) {
			return html;
		}
		throw new Error('logout button not found');
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this._config };
	}
}
