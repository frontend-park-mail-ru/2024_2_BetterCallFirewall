import {
	ACTION_MENU_TYPES,
	MenuLinkClickAction,
} from '../../actions/actionMenu';
import { IHomeConfig } from '../../app';
import {
	Container,
	Header,
	IContainerConfig,
	IContentConfig,
	IHeaderConfig,
	IMenuConfig,
	Menu,
	Root,
} from '../../components';
import { IBaseComponent } from '../../components/BaseComponent';
import dispatcher from '../../dispatcher/dispatcher';
import { BaseView, Components, View, ViewData, ViewMenu } from '../view';

export interface MainConfig {
	key: string;
	className: string;
	section: string;
	header: IHeaderConfig;
	content: IContentConfig;
	aside: IContainerConfig;
}

export interface HomeConfig {
	menu: IMenuConfig;
	main: MainConfig;
}

export class ViewHome extends BaseView implements View, ViewMenu {
	private _config: HomeConfig;
	private _components: Components = {};

	constructor(config: HomeConfig, root: Root) {
		super(root);
		this._config = config;
		this._root = new Root();
	}

	get config() {
		return this._config;
	}

	update(data: ViewData) {
		this._config = data as IHomeConfig;
		this.clear();
		this.render();
	}

	clear(): void {
		Object.keys(this._root.children).forEach((key) => {
			this._root.children[key].remove();
		});
	}

	render(): void {
		this.renderMenu();
		this.renderMain();
	}

	updateMenu(data: IMenuConfig): void {
		console.log('updateMenu');
		this._config.menu = data;
		const menu = this._components.menu;
		menu.remove();
		menu.config = data;
		menu.render();
	}

	private renderMenu() {
		const config = this._config.menu;

		const menu = new Menu(config, this._root);
		menu.render();
		this._components.menu = menu;

		const feedLink = menu.children[config.links.feed.key];
		menu.addHandler(feedLink.htmlElement, 'click', (event) => {
			event.preventDefault();
			dispatcher.getAction(
				new MenuLinkClickAction(ACTION_MENU_TYPES.menuLinkClick, {
					href: config.links.feed.href,
				}),
			);
		});
	}

	private renderMain() {
		const main = new Container(this._config.main, this._root);
		main.render();
		this.renderHeader(main);
	}

	private renderHeader(parent: IBaseComponent) {
		const headerConfig = this._config.main.header;
		const header = new Header(headerConfig, parent);
		header.render();
	}
}
