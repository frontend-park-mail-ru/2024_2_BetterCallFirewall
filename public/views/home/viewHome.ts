import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import {
	ActionHeaderLogoutClickFail,
	ActionHeaderLogoutClickSuccess,
} from '../../actions/actionHeader';
import { ACTION_MENU_TYPES } from '../../actions/actionMenu';
import { ACTION_PROFILE_TYPES } from '../../actions/actionProfile';
import app from '../../app';
import {
	Header,
	Container,
	IContainerConfig,
	IContentConfig,
	IHeaderConfig,
	MenuConfig,
	Content,
	Root,
} from '../../components';
import Menu from '../../components/Menu/Menu';
import config, { PAGE_LINKS } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import ajax from '../../modules/ajax';
import { update, VNode } from '../../modules/vdom';
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
	menu: MenuConfig;
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
	updateMenu(data: MenuConfig): void;
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
		switch (change.type) {
			case ACTION_PROFILE_TYPES.getHeaderSuccess:
			case ACTION_MENU_TYPES.updateProfileLinkHref:
				this.updateViewHome(change.data);
				break;
			case ACTION_APP_TYPES.actionAppInit:
			case ACTION_APP_TYPES.goTo:
				this._configHome = Object.assign(this._configHome, change.data);
				this.render();
				break;
		}
	}

	updateViewHome(data: HomeConfig) {
		this._configHome = data;
		this._render();
	}

	render(): void {
		this._render();
	}

	// updateMenu(data: MenuConfig): void {
	// 	this._configHome.menu = data;
	// 	const menu = this._components.menu;
	// 	if (!menu) {
	// 		throw new Error('menu does not exist on ViewHome');
	// 	}
	// 	menu.update(data);
	// 	this._addMenuHandlers();
	// }

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
		console.log('ViewHome._render()');
		const rootVNode = this._root.vnode;
		console.log('rootVNode:', rootVNode);
		const menuVNode = this._renderMenu();
		console.log('menuVNode:', menuVNode);
		rootVNode.children.push(menuVNode);
		console.log('rootVNode.children:', rootVNode.children);
		update(this._root.node, rootVNode);

		// this.clear();
		// this._renderMenu();
		// this._renderMain();
		// this._renderContent();
		// const main = this._components.main;
		// if (!main) {
		// 	throw new Error('main does not exist on viewHome');
		// }
		// const aside = new Container(this._configHome.main.aside, main);
		// aside.render();
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

	private get menu(): Menu {
		const menu = this._components.menu;
		if (!menu) {
			throw new Error('menu does not exist');
		}
		return menu;
	}

	private _renderMenu(): VNode {
		this._components.menu = new Menu(this._configHome.menu, this._root);
		return this.menu.vnode;

		// this._components.menu = new Menu(this._configHome.menu, this._root);
		// this._components.menu.render();
		// this._addMenuHandlers();
	}

	private _addMenuHandlers() {
		const menu = this._components.menu;
		if (!menu) {
			throw new Error('menu not found');
		}
		// const config = menu.config;
		// const feedLink = menu.children[config.links.feed.key];
		// menu.addHandler(feedLink.htmlElement, 'click', (event) => {
		// 	event.preventDefault();
		// 	this.sendAction(new ActionAppGoTo(config.links.feed.href));
		// });

		// const profileLink = menu.children[config.links.profile.key];
		// menu.addHandler(profileLink.htmlElement, 'click', (event) => {
		// 	event.preventDefault();
		// 	this.sendAction(new ActionAppGoTo(config.links.profile.href));
		// });

		// const friendsLink = menu.children[config.links.friends.key];
		// menu.addHandler(friendsLink.htmlElement, 'click', (event) => {
		// 	event.preventDefault();
		// 	this.sendAction(new ActionAppGoTo(config.links.friends.href));
		// });

		// const messagesLink = menu.children[config.links.messages.key];
		// menu.addHandler(messagesLink.htmlElement, 'click', (event) => {
		// 	event.preventDefault();
		// 	this.sendAction(new ActionAppGoTo(config.links.messages.href));
		// });

		// const titleHTML = menu.htmlElement.querySelector(
		// 	'[data-key=title]',
		// ) as HTMLElement;
		// if (!titleHTML) {
		// 	throw new Error('title not found');
		// }
		// menu.addHandler(titleHTML, 'click', (event) => {
		// 	event.preventDefault();
		// 	dispatcher.getAction(new ActionMenuTitleClick());
		// });
	}

	// private _renderMain() {
	// 	this._components.main = new Container(
	// 		this._configHome.main,
	// 		this._root,
	// 	);
	// 	this._components.main.render();
	// 	this._renderHeader();
	// }

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
			// this.sendAction(
			// 	new ActionMenuLinkClick({ href: `/${profile.profile.id}` }),
			// );
			this.sendAction(new ActionAppGoTo(`/${profile.profile.id}`));
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
