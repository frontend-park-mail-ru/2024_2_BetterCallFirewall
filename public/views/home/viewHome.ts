import {
	ActionHeaderLogoutClickFail,
	ActionHeaderLogoutClickSuccess,
} from '../../actions/actionHeader';
import {
	ACTION_MENU_TYPES,
	ActionMenuLinkClick,
} from '../../actions/actionMenu';
import app, { IHomeConfig } from '../../app';
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
import config, { PAGE_LINKS } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import ajax from '../../modules/ajax';
import { BaseView, Components, View, ViewData } from '../view';

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

export type ComponentsHome = {
	menu?: Menu;
	header?: Header;
} & Components;

export interface ViewMenu extends ViewHome {
	updateMenu(data: IMenuConfig): void;
}

export interface ViewHeader extends ViewHome {
	updateHeader(data: IHeaderConfig): void;
}

export interface IViewHome extends View, ViewMenu, ViewHeader {}

export abstract class ViewHome extends BaseView implements IViewHome {
	protected _config: HomeConfig;
	protected _components: ComponentsHome = {};

	constructor(config: HomeConfig, root: Root) {
		super(root);
		this._config = config;
		// this._root = root;
	}

	get config() {
		return this._config;
	}

	update(data: ViewData) {
		this._config = data as IHomeConfig;
		this.clear();
		this.render();
	}

	render(): void {
		this.clear();
		this._renderMenu();
		this._renderMain();
	}

	protected abstract _renderContent(parent: IBaseComponent): void;

	updateMenu(data: IMenuConfig): void {
		this._config.menu = data;
		const menu = this._components.menu as Menu;
		menu.update(data);
		this._addMenuHandlers();
	}

	updateHeader(data: IHeaderConfig): void {
		const header = this._components.header;
		header?.update(data);
		this._addHeaderHandlers();
	}

	private _renderMenu() {
		const config = this._config.menu;

		const menu = new Menu(config, this._root);
		menu.render();
		this._components.menu = menu;
		this._addMenuHandlers();
	}

	private _addMenuHandlers() {
		const menu = this._components.menu;
		if (!menu) {
			throw new Error('menu not found');
		}
		const config = menu.config;
		const feedLink = menu.children[config.links.feed.key];
		menu.addHandler(feedLink.htmlElement, 'click', (event) => {
			event.preventDefault();
			dispatcher.getAction(
				new ActionMenuLinkClick(ACTION_MENU_TYPES.menuLinkClick, {
					href: config.links.feed.href,
				}),
			);
		});
	}

	private _renderMain() {
		const main = new Container(this._config.main, this._root);
		main.render();
		this._renderHeader(main);
		this._renderContent(main);
	}

	private _renderHeader(parent: IBaseComponent) {
		const headerConfig = this._config.main.header;
		const header = new Header(headerConfig, parent);
		header.render();
		this._components.header = header;
		this._addHeaderHandlers();
	}

	private _addHeaderHandlers() {
		const header = this._components.header;
		if (!header) {
			throw new Error('header not found');
		}
		header.addHandler(header.logoutButtonHTML, 'click', (event: Event) => {
			event.preventDefault();
			logoutButtonClick();
		});
	}
}

const logoutButtonClick = () => {
	ajax.post(config.URL.logout, {}, (data, error) => {
		if (error) {
			dispatcher.getAction(new ActionHeaderLogoutClickFail());
			return;
		}
		app.router.goToPage(PAGE_LINKS.login);
		dispatcher.getAction(new ActionHeaderLogoutClickSuccess());
	});
};
