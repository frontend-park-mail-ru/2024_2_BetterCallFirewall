import {
	ACTION_HOME_TYPES,
	MenuLinkClickAction,
} from '../../actions/actionHome';
import { IHomeConfig } from '../../app';
import {
	Header,
	IContainerConfig,
	IContentConfig,
	IHeaderConfig,
	IMenuConfig,
	Menu,
	Root,
} from '../../components';
import dispatcher from '../../dispatcher/dispatcher';
import { BaseView, Components, ViewData } from '../view';

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

export class ViewHome extends BaseView {
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
		this.renderHeader();
		this.renderMenu();
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
				new MenuLinkClickAction(ACTION_HOME_TYPES.menuLinkClick, {
					href: config.links.feed.href,
				}),
			);
		});
	}

	// private renderFeed() {
	// 	const mainConfig: IMainConfig = this._config.main;
	// 	const main = new Container(mainConfig, this._root);
	// }

	private renderHeader() {
		const headerConfig = this._config.main.header;
		const header = new Header(headerConfig, this._root);
		header.render();
	}
}
