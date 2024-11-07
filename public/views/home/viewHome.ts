import { ACTION_APP_TYPES } from '../../actions/actionApp';
import {
	ActionHeaderLogoutClickFail,
	ActionHeaderLogoutClickSuccess,
} from '../../actions/actionHeader';
import { ACTION_LOGIN_TYPES } from '../../actions/actionLogin';
import {
	ACTION_MENU_TYPES,
	ActionMenuLinkClick,
	ActionMenuTitleClick,
} from '../../actions/actionMenu';
import { ACTION_PROFILE_TYPES } from '../../actions/actionProfile';
import api from '../../api/api';
import app from '../../app';
import {
	Header,
	Container,
	IContainerConfig,
	IContentConfig,
	IHeaderConfig,
	IMenuConfig,
	Menu,
	Root,
	Content,
} from '../../components';
import config, { PAGE_LINKS } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import ajax from '../../modules/ajax';
import { ChangeHome } from '../../stores/storeHome';
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
	errorMessage: string;
}

export type ComponentsHome = {
	main?: Container;
	menu?: Menu;
	header?: Header;
	content?: Content;
	aside?: Container;
} & Components;

export interface ViewMenu extends ViewHome {
	updateMenu(data: IMenuConfig): void;
}

export interface ViewHeader extends ViewHome {
	updateHeader(data: IHeaderConfig): void;
}

export interface IViewHome extends View {
	updateViewHome(data: HomeConfig): void;
}

export abstract class ViewHome extends BaseView implements IViewHome {
	protected _components: ComponentsHome = {};
	private _configHome: HomeConfig;

	constructor(config: HomeConfig, root: Root) {
		super(root);
		this._configHome = config;
	}

	get config() {
		return this._configHome;
	}

	handleChange(change: ChangeHome): void {
		console.log('ViewHome: change:', change);
		switch (change.type) {
			case ACTION_PROFILE_TYPES.getHeaderSuccess:
			case ACTION_MENU_TYPES.updateProfileLinkHref:
				this.updateViewHome(change.data);
				break;
			case ACTION_LOGIN_TYPES.loginClickSuccess:
			case ACTION_PROFILE_TYPES.getHeader:
				api.requestHeader();
				break;
			case ACTION_APP_TYPES.actionAppInit:
			case ACTION_MENU_TYPES.menuLinkClick:
				this._configHome = change.data;
				this.render();
				break;
		}
	}

	updateViewHome(data: HomeConfig) {
		console.log('ViewHome: update:');
		this._configHome = data;
		this._render();
	}

	render(): void {
		this._render();
	}

	updateMenu(data: IMenuConfig): void {
		this._configHome.menu = data;
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
		return this._components;
	}

	protected get content(): Content {
		const content = this._components.content;
		if (!content) {
			throw new Error('view has no content');
		}
		return content;
	}

	protected get _profileLinkHref(): string {
		const profileLink = this._configHome.menu.links.profile;
		if (!profileLink) {
			throw new Error('profile link not found');
		}
		return profileLink.href;
	}

	protected _clearContent() {
		const content = this._components.content;
		if (!content) {
			throw new Error('content does not exist on ViewHome');
		}
		content.removeInner();
	}

	protected _updateContent() {
		this._clearContent();
		this._renderContent();
	}

	protected _renderContent(): void {
		const main = this._components.main;
		if (!main) {
			throw new Error('main does not exist on viewHome');
		}
		this._components.content = new Content(
			this._configHome.main.content,
			main,
		);
		this._components.content.render();
	}

	protected _render() {
		this.clear();
		this._renderMenu();
		this._renderMain();
		this._renderContent();
		const main = this._components.main;
		if (!main) {
			throw new Error('main does not exist on viewHome');
		}
		const aside = new Container(this._configHome.main.aside, main);
		aside.render();
	}

	// true, если до конца документа осталось меньше двух экранов
	protected _isNearBottom = () => {
		return (
			window.innerHeight * 2 + window.scrollY > document.body.offsetHeight
		);
	};

	protected _printMessage() {
		if (this._configHome.errorMessage) {
			this.content.printMessage(this._configHome.errorMessage);
		}
	}

	private _renderMenu() {
		this._components.menu = new Menu(this._configHome.menu, this._root);
		this._components.menu.render();
		// this._updateActiveMenuLinks();
		this._addMenuHandlers();
	}

	// private _updateActiveMenuLinks() {
	// 	console.log('update active link');
	// 	const curPath = app.router.path;
	// 	const menu = this._components.menu;
	// 	if (menu) {
	// 		Object.keys(menu.config.links).forEach((key) => {
	// 			const link = menu.config.links[key];
	// 			console.log('current path:');
	// 			link.active = curPath === link.href;
	// 		});
	// 	}
	// }

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

		const messagesLink = menu.children[config.links.messages.key];
		menu.addHandler(messagesLink.htmlElement, 'click', (event) => {
			event.preventDefault();
			this.sendAction(
				new ActionMenuLinkClick({ href: config.links.messages.href }),
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
		this._components.main = new Container(
			this._configHome.main,
			this._root,
		);
		this._components.main.render();
		this._renderHeader();
	}

	private _renderHeader() {
		const main = this._components.main;
		if (!main) {
			throw new Error('main does not exist on viewHome');
		}
		this._components.header = new Header(
			this._configHome.main.header,
			main,
		);
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

		header.addHandler(header.profileLink, 'click', (event) => {
			event.preventDefault();
			const profile = header.config as IHeaderConfig;
			this.sendAction(
				new ActionMenuLinkClick({ href: `/${profile.profile.id}` }),
			);
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
