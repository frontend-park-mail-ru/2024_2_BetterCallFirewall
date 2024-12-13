import { findVNodeByKey, VNode } from '../../modules/vdom';
import Component, { ComponentConfig } from '../Component';
import MenuLink, { MenuLinkConfig } from '../MenuLink/MenuLink';

// type TitleConfig = {
// 	key: string;
// 	text: string;
// 	href: string;
// };
// type LinksConfig = [string, IMenuLinkConfig][];
// type Links = IMenuLink[];

// export interface IMenuConfig extends IBaseComponentConfig {
// 	title: TitleConfig;
// 	links: Record<string, IMenuLinkConfig>;
// }

// export interface IMenu extends IBaseComponent {}

// /**
//  * Class to menu navigation
//  */
// export class Menu extends BaseComponent implements IMenu {
// 	protected override _config: IMenuConfig | null;
// 	private links: Links = [];

// 	/**
// 	 * Создает новый компонент меню
// 	 * @param {IMenuConfig} config
// 	 * @param {IBaseComponent} parent
// 	 */
// 	constructor(config: IMenuConfig, parent: IBaseComponent) {
// 		super(config, parent);
// 		this._config = config;
// 	}

// 	/**
// 	 * Getting configs of links
// 	 * @returns {ArrayLike<[string, Object]>}
// 	 */
// 	get linksConfig(): LinksConfig {
// 		if (!this._config) {
// 			throw new Error('component has no config');
// 		}
// 		return Object.entries(this._config.links);
// 	}

// 	get config(): IMenuConfig {
// 		if (this._config) {
// 			return this._config;
// 		}
// 		throw new Error('config not found');
// 	}

// 	set config(config: IMenuConfig) {
// 		this._config = config;
// 	}

// 	/**
// 	 * Rendering menu and add to parent elem
// 	 *
// 	 * @returns {string}
// 	 */
// 	render(show: boolean = true): string {
// 		this._prerender();
// 		this._render('Menu.hbs', show);

// 		const menuItems = this._htmlElement?.querySelector(
// 			'.menu__items',
// 		) as HTMLElement;
// 		if (menuItems) {
// 			this.links.forEach((link) => {
// 				link.render(false);
// 				link.appendToHTML(menuItems);
// 			});
// 		} else {
// 			throw new Error('menu has no .menu__items');
// 		}

// 		return this.htmlElement.outerHTML;
// 	}

// 	remove(): void {
// 		super.remove();
// 		this.links = [];
// 	}

// 	removeForUpdate(): void {
// 		super.removeForUpdate();
// 		this.links = [];
// 	}

// 	protected _prerender(): void {
// 		super._prerender();
// 		this.linksConfig.forEach(([, value]) => {
// 			const link = new MenuLink(value, this);
// 			this.links.push(link);
// 		});
// 		this._templateContext = {
// 			...this._config,
// 			title: this._config?.title,
// 		};
// 	}
// }

type TitleConfig = {
	key: string;
	text: string;
	href: string;
};
type LinksConfig = [string, MenuLinkConfig][];
type Links = MenuLink[];

export interface MenuConfig extends ComponentConfig {
	title: TitleConfig;
	links: {
		feed: MenuLinkConfig;
		profile: MenuLinkConfig;
		friends: MenuLinkConfig;
		messages: MenuLinkConfig;
		groups: MenuLinkConfig;
		stickers: MenuLinkConfig;
	};
	isShow?: boolean;
}

export default class Menu extends Component {
	protected _config: MenuConfig;
	protected _links: Links = [];

	constructor(config: MenuConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): MenuConfig {
		return this._config;
	}

	get linksConfig(): LinksConfig {
		return Object.entries(this.config.links);
	}

	get titleVNode(): VNode {
		const vnode = findVNodeByKey(this.vnode, this._config.title.key);
		if (!vnode) {
			throw new Error('title not found');
		}
		return vnode;
	}

	get html(): Element {
		return this._findHTML('.menu');
	}

	menuLinkVNode(key: string): VNode {
		const vnode = findVNodeByKey(this.vnode, key);
		if (!vnode) {
			throw new Error('menu link not found');
		}
		return vnode;
	}

	render(): string {
		this._prerender();
		return this._render('Menu.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._links = this.linksConfig.map(([, config]) => {
			return new MenuLink(config, this);
		});
		this._templateContext = {
			...this._templateContext,
			title: this._config.title,
			links: this._links.map((link) => link.render()),
			isShow: this._config.isShow,
		};
	}
}
