import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import {
	ActionHeaderLogoutClickFail,
	ActionHeaderLogoutClickSuccess,
} from '../../actions/actionHeader';
import {
	ACTION_MENU_TYPES,
	ActionMenuTitleClick,
} from '../../actions/actionMenu';
import { ACTION_PROFILE_TYPES } from '../../actions/actionProfile';
import app from '../../app';
import {
	Header,
	Container,
	ContainerConfig,
	HeaderConfig,
	MenuConfig,
	Root,
	ContentConfig,
	Content,
} from '../../components';
import Menu from '../../components/Menu/Menu';
import { PAGE_LINKS } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import ajax from '../../modules/ajax';
import { ExtendedNode } from '../../modules/vdom';
import { ChangeHome } from '../../stores/storeHome';
import { Components, View } from '../view';

export interface MainConfig {
	key: string;
	className: string;
	header: HeaderConfig;
	content: ContentConfig;
	aside: ContainerConfig;
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

export abstract class ViewHome extends View {
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

	protected _render() {
		console.log('ViewHome._render()');

		const rootNode: ExtendedNode = this._root.node;
		console.log('rootNode:', rootNode);

		this._root.clear();
		this._components.menu = new Menu(this._configHome.menu, this._root);
		this._components.main = new Container(
			this._configHome.main,
			this._root,
		);
		this._components.header = new Header(
			this._configHome.main.header,
			this._components.main,
		);
		this._components.content = new Content(
			this._configHome.main.content,
			this._components.main,
		);
		this._components.aside = new Container(
			this._configHome.main.aside,
			this._components.main,
		);
	}

	protected _addHandlers() {
		this._addMenuHandlers();
		this._addHeaderHandlers();
	}

	// true, если до конца документа осталось меньше двух экранов
	protected _isNearBottom = () => {
		return (
			window.innerHeight * 2 + window.scrollY > document.body.offsetHeight
		);
	};

	private get menu(): Menu {
		const menu = this._components.menu;
		if (!menu) {
			throw new Error('menu does not exist');
		}
		return menu;
	}

	private get header(): Header {
		const header = this._components.header;
		if (!header) {
			throw new Error('header does not exist');
		}
		return header;
	}

	private _addMenuHandlers() {
		Object.entries(this.menu.config.links).forEach(([, link]) => {
			const linkVNode = this.menu.menuLinkVNode(link.key);
			linkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionAppGoTo(link.href));
				},
			});
			console.log('linkVNode:', linkVNode);
		});

		this.menu.titleVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this.sendAction(new ActionMenuTitleClick());
			},
		});
	}

	private _addHeaderHandlers() {
		this.header.logoutButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				logoutButtonClick();
			},
		});
		this.header.profileLinkVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				const profile = this.header.config;
				this.sendAction(new ActionAppGoTo(`/${profile.profile.id}`));
			},
		});
	}
}

const logoutButtonClick = () => {
	ajax.post(app.config.URL.logout, {}, (data, error) => {
		if (error) {
			dispatcher.getAction(new ActionHeaderLogoutClickFail());
			return;
		}
		app.router.goToPage(PAGE_LINKS.login);
		dispatcher.getAction(new ActionHeaderLogoutClickSuccess());
	});
};
