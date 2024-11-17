// import BaseComponent, {
// 	IBaseComponent,
// 	IBaseComponentConfig,
// } from '../BaseComponent';

// type Profile = {
// 	id: number;
// 	name: string;
// 	avatar: string;
// };

// export interface IHeaderConfig extends IBaseComponentConfig {
// 	profile: Profile;
// }

// /**
//  * Class of header
//  */
// export class Header extends BaseComponent {
// 	/**
// 	 * Instance of Header
// 	 *
// 	 * @param {IHeaderConfig} config
// 	 * @param {IBaseComponent} parent
// 	 */
// 	constructor(config: IHeaderConfig, parent: IBaseComponent) {
// 		super(config, parent);
// 	}

// 	/**
// 	 * Rendering header with handlebars
// 	 *
// 	 * @returns {string} - generated HTML element
// 	 */
// 	render(): string {
// 		this._prerender();
// 		return this._render('Header.hbs');
// 	}

// 	get logoutButtonHTML(): HTMLElement {
// 		const html = this.htmlElement.querySelector(
// 			'.header__logout',
// 		) as HTMLElement;
// 		if (html) {
// 			return html;
// 		}
// 		throw new Error('logout button not found');
// 	}

// 	get profileLink(): HTMLElement {
// 		const html = this.htmlElement.querySelector(
// 			'.header-img',
// 		) as HTMLElement;
// 		if (html) {
// 			return html;
// 		}
// 		throw new Error('logout button not found');
// 	}

// 	protected _prerender(): void {
// 		super._prerender();
// 		this._templateContext = { ...this._config };
// 	}
// }

import Component, { ComponentConfig } from '../Component';

type Profile = {
	id: number;
	name: string;
	avatar: string;
};

export interface HeaderConfig extends ComponentConfig {
	profile: Profile;
}

/**
 * Class of header
 */
export class Header extends Component {
	/**
	 * Instance of Header
	 *
	 * @param {HeaderConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: HeaderConfig, parent: Component) {
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

	// get logoutButtonHTML(): HTMLElement {
	// 	const html = this.htmlElement.querySelector(
	// 		'.header__logout',
	// 	) as HTMLElement;
	// 	if (html) {
	// 		return html;
	// 	}
	// 	throw new Error('logout button not found');
	// }

	// get profileLink(): HTMLElement {
	// 	const html = this.htmlElement.querySelector(
	// 		'.header-img',
	// 	) as HTMLElement;
	// 	if (html) {
	// 		return html;
	// 	}
	// 	throw new Error('logout button not found');
	// }
}
