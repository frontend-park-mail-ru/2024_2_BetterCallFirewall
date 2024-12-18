import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import {
	ACTION_CONFIRM_TYPES,
	ActionConfirmOpen,
} from '../../actions/actionConfirm';
import { ActionGroupsSearch } from '../../actions/actionGroups';
import {
	ActionHeaderLogoutClickFail,
	ActionHeaderLogoutClickSuccess,
	ActionHeaderSearchResultsSwitch,
} from '../../actions/actionHeader';
import {
	ACTION_MENU_TYPES,
	ActionMenuOpenSwitch,
	ActionMenuTitleClick,
} from '../../actions/actionMenu';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileSearch,
} from '../../actions/actionProfile';
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
import {
	Confirm,
	ConfirmConfig,
	Style,
} from '../../components/Confirm/Confirm';
import { CSAT, CSATConfig } from '../../components/CSAT/CSAT';
import Menu from '../../components/Menu/Menu';
import { PAGE_LINKS, PAGE_URLS } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import ajax from '../../modules/ajax';
import { debounce } from '../../modules/debounce';
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
	csat: CSATConfig;
	confirm?: ConfirmConfig;
}

export type ComponentsHome = {
	main?: Container;
	menu?: Menu;
	header?: Header;
	content?: Content;
	aside?: Container;
	confirm?: Confirm;
	csat?: CSAT;
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
			case ACTION_CONFIRM_TYPES.open:
			case ACTION_CONFIRM_TYPES.close:
			case ACTION_PROFILE_TYPES.getHeaderSuccess:
			case ACTION_MENU_TYPES.updateProfileLinkHref:
				this.updateViewHome(change.data);
				break;
			case ACTION_APP_TYPES.actionAppInit:
				this.sendAction(new ActionAppGoTo(app.router.path));
				break;
			case ACTION_APP_TYPES.goTo:
				this._configHome = change.data;
				this.render(change.data);
				this.sendAction(new ActionMenuOpenSwitch(false));
				break;
		}
	}

	updateViewHome(data: HomeConfig) {
		this._configHome = data;
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
		if (this._configHome.confirm) {
			this._components.confirm = new Confirm(
				this._configHome.confirm,
				this._root,
			);
		}
	}

	protected _addHandlers() {
		this._addMenuHandlers();
		this._addHeaderHandlers();
		this._root.addDocumentHandler({
			event: 'click',
			callback: (event) => {
				if (
					this.header.config.showSearchResults &&
					!this.header.searchResultsHTML.contains(
						event.target as Node,
					)
				) {
					this.sendAction(new ActionHeaderSearchResultsSwitch(false));
				}
				if (
					this.menu.config.isShow &&
					!this.menu.html.contains(event.target as Node)
				) {
					this.sendAction(new ActionMenuOpenSwitch(false));
				}
			},
		});
		this._components.csat?.exitButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				if (this._components.csat) this._configHome.csat.show = false;
				this._render();
			},
		});
	}

	// true, если до конца документа осталось меньше экрана
	protected _isNearBottom = () => {
		return (
			window.innerHeight * 2 + window.scrollY > document.body.offsetHeight
		);
	};

	// true, если до конца документа осталось меньше 100 пикселей
	protected _isOnBottom = () => {
		return (
			100 + window.innerHeight + window.scrollY >
			document.body.offsetHeight
		);
	};

	// true, если высота документа больше 2-х экранов
	protected _isTwoScreenHeights() {
		return window.innerHeight * 2 < document.body.offsetHeight;
	}

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
				this.logoutButtonClick();
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
		this.header.menuOpenerVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				event.stopImmediatePropagation();
				this.sendAction(
					new ActionMenuOpenSwitch(!this._configHome.menu.isShow),
				);
			},
		});
		this.header.searchInputVNode.handlers.push(
			{
				event: 'input',
				callback: (event) => {
					event.preventDefault();
					const input = event.currentTarget as HTMLInputElement;
					if (input && input.value.length > 2) {
						this._searchInputHandler(input.value);
					}
				},
			},
			{
				event: 'focus',
				callback: (event) => {
					event.preventDefault();
					const input = event.currentTarget as HTMLInputElement;
					if (input?.value.length) {
						this.sendAction(
							new ActionHeaderSearchResultsSwitch(true),
						);
					}
				},
			},
			{
				event: 'click',
				callback: (event) => {
					event.stopPropagation();
				},
			},
		);
		this.header.profilesSearch.forEach((profileSearch) => {
			profileSearch.vnode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionAppGoTo(
							PAGE_URLS.profile + `/${profileSearch.config.id}`,
						),
					);
					this.sendAction(new ActionHeaderSearchResultsSwitch(false));
				},
			});
		});
		this.header.groupsSearch.forEach((groupSearch) => {
			groupSearch.vnode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(
						new ActionAppGoTo(
							PAGE_URLS.groups + `/${groupSearch.config.id}`,
						),
					);
					this.sendAction(new ActionHeaderSearchResultsSwitch(false));
				},
			});
		});
	}

	private _searchInputHandler = debounce((str: string, append?: boolean) => {
		const profilesSearch = this._configHome.main.header.profilesSearch;
		const groupsSearch = this._configHome.main.header.groupsSearch;
		this.sendAction(
			new ActionProfileSearch(
				str,
				append
					? profilesSearch[profilesSearch.length - 1]?.id
					: undefined,
			),
		);
		this.sendAction(
			new ActionGroupsSearch(
				str,
				append ? groupsSearch[groupsSearch.length - 1]?.id : undefined,
			),
		);
	}, 200);

	private logoutButtonClick() {
		this.sendAction(
			new ActionConfirmOpen({
				key: 'confirm-logout',
				title: 'Выйти из аккаунта?',
				text: '',
				actions: [
					{
						text: 'Выйти',
						style: Style.Negative,
						callback: (event) => {
							event.preventDefault();
							logout();
						},
					},
					{
						text: 'Отмена',
						style: Style.Main,
					},
				],
			}),
		);
	}
}

const logout = () => {
	ajax.post(app.config.URL.logout, {}, (data, error) => {
		if (error) {
			dispatcher.getAction(new ActionHeaderLogoutClickFail());
			return;
		}
		app.router.goToPage(PAGE_LINKS.login);
		dispatcher.getAction(new ActionHeaderLogoutClickSuccess());
	});
};
