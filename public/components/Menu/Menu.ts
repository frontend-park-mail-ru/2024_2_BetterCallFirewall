import { findVNodeByKey, VNode } from '../../modules/vdom';
import { Component, ComponentConfig } from '../Component';
import MenuLink, { MenuLinkConfig } from '../MenuLink/MenuLink';

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
