import {
	ActionHeaderLogoutClickFail,
	ActionHeaderLogoutClickSuccess,
} from '../../actions/actionHeader';
import {
	ActionMenuLinkClick,
	ActionMenuTitleClick,
} from '../../actions/actionMenu';
import app, { IHomeConfig } from '../../app';
import {
	Header,
	Container,
	IContainerConfig,
	IContent,
	IContentConfig,
	IHeaderConfig,
	IMenuConfig,
	Menu,
	Root,
	Content,
} from '../../components';
import { IBaseComponent } from '../../components/BaseComponent';
import config, { PAGE_LINKS } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import ajax from '../../modules/ajax';
import { BaseView, Components, View } from '../view';

export interface MainConfig {
	key: string;
	className: string;
	header: IHeaderConfig;
	content: IContentConfig;
	aside: IContainerConfig;
}

export interface HomeConfig {
	menu: IMenuConfig;
	main: MainConfig;
}

export type ComponentsHome = {
	main?: Container;
	menu?: Menu;
	header?: Header;
	content?: IContent;
	aside?: Container;
} & Components;

export interface ViewMenu extends ViewHome {
	updateMenu(data: IMenuConfig): void;
}

export interface ViewHeader extends ViewHome {
	updateHeader(data: IHeaderConfig): void;
}

export interface IViewHome extends View, ViewMenu, ViewHeader {
	updateViewHome(data: IHomeConfig): void;
}

export abstract class ViewHome extends BaseView implements IViewHome {
	protected _config: HomeConfig;
	protected _components: ComponentsHome = {};

	constructor(config: IHomeConfig, root: Root) {
		super(root);
		this._config = config;
	}

	get config() {
		return this._config;
	}

	updateViewHome(data: IHomeConfig) {
		console.log('ViewHome: update');
		this._config = data as IHomeConfig;
		this.render();
	}

	render(): void {
		this.clear();
		this._renderMenu();
		this._renderMain();
		this._renderContent();
		const main = this._components.main;
		if (!main) {
			throw new Error('main does not exist on viewHome');
		}
		const aside = new Container(this._config.main.aside, main);
		aside.render();
	}

	updateMenu(data: IMenuConfig): void {
		console.log('update');
		this._config.menu = data;
		const menu = this._components.menu;
		if (!menu) {
			throw new Error('menu does not exist on ViewHome');
		}
		menu.update(data);
		this._addMenuHandlers();
	}

	updateHeader(data: IHeaderConfig): void {
		const header = this._components.header;
		if (!header) {
			throw new Error('header does not exist on ViewHome');
		}
		header.update(data);
		this._addHeaderHandlers();
	}

	updateMain(data: MainConfig): void {
		this.updateHeader(data.header);
		const content = this._components.content;
		const main = this._components.main;
		const aside = this._components.aside;
		if (!main || !content || !aside) {
			throw new Error('component does not exist on ViewHome');
		}
		main.update(data);
		content.update(data.content);
		aside.update(data.aside);
	}

	protected get _homeComponents(): ComponentsHome {
		console.log('_homeComponents call:', this);
		return this._components;
	}

	protected _clearContent() {
		const content = this._components.content;
		if (!content) {
			throw new Error('content does not exist on ViewHome');
		}
		content.removeInner();
	}

	protected _updateContent(parent: IBaseComponent) {
		console.log('homeView.updateContent()');
		console.log('parent:', parent);
		this._clearContent();
		this._renderContent();
	}

	protected _renderContent(): void {
		const main = this._components.main;
		if (!main) {
			throw new Error('main does not exist on viewHome');
		}
		this._components.content = new Content(this._config.main.content, main);
		this._components.content.render();
	}

	private _renderMenu() {
		this._components.menu = new Menu(this._config.menu, this._root);
		this._components.menu.render();
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
				new ActionMenuLinkClick({
					href: config.links.feed.href,
				}),
			);
		});

		const profileLink = menu.children[config.links.profile.key];
		menu.addHandler(profileLink.htmlElement, 'click', (event) => {
			event.preventDefault();
			dispatcher.getAction(
				// new ActionGoToProfile({
				// 	href: config.links.profile.href,
				// }),
				new ActionMenuLinkClick({ href: config.links.profile.href }),
			);
		});

		const friendsLink = menu.children[config.links.friends.key];
		menu.addHandler(friendsLink.htmlElement, 'click', (event) => {
			event.preventDefault();
			dispatcher.getAction(
				new ActionMenuLinkClick({ href: config.links.friends.href }),
			);
		});

		const titleHTML = menu.htmlElement.querySelector(
			'[data-key=title]',
		) as HTMLElement;
		if (!titleHTML) {
			throw new Error('title not found');
		}
		menu.addHandler(titleHTML, 'click', (event) => {
			event.preventDefault();
			dispatcher.getAction(new ActionMenuTitleClick());
		});
	}

	private _renderMain() {
		this._components.main = new Container(this._config.main, this._root);
		this._components.main.render();
		this._renderHeader();
	}

	private _renderHeader() {
		const main = this._components.main;
		if (!main) {
			throw new Error('main does not exist on viewHome');
		}
		this._components.header = new Header(this._config.main.header, main);
		this._components.header.render();
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
