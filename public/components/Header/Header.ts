import { findVNodeByClass, VNode } from '../../modules/vdom';
import Component, { ComponentConfig } from '../Component';
import { SearchResult, SearchResultConfig } from '../SearchResult/SearchResult';

type Profile = {
	id: number;
	name: string;
	avatar: string;
};

export interface HeaderConfig extends ComponentConfig {
	search: {
		img: string;
		placeholder: string;
	};
	profile: Profile;
	showSearchResults: boolean;
	profilesSearch: SearchResultConfig[];
	groupsSearch: SearchResultConfig[];
}

/**
 * Class of header
 */
export class Header extends Component {
	protected _config: HeaderConfig;
	private _profilesSearch: SearchResult[] = [];
	private _groupsSearch: SearchResult[] = [];

	/**
	 * Instance of Header
	 *
	 * @param {HeaderConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: HeaderConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): HeaderConfig {
		return this._config;
	}

	get profilesSearch(): SearchResult[] {
		return this._profilesSearch;
	}

	get groupsSearch(): SearchResult[] {
		return this._groupsSearch;
	}

	get logoutButtonVNode(): VNode {
		const vnode = findVNodeByClass(this.vnode, 'header__logout');
		if (!vnode) {
			throw new Error('logout button not found');
		}
		return vnode;
	}

	get profileLinkVNode(): VNode {
		const vnode = findVNodeByClass(this.vnode, 'header-img');
		if (!vnode) {
			throw new Error('profile link not found');
		}
		return vnode;
	}

	get menuOpenerVNode(): VNode {
		const vnode = findVNodeByClass(this.vnode, 'header__menu-opener');
		if (!vnode) {
			throw new Error('menu opener not found');
		}
		return vnode;
	}

	get searchInputVNode(): VNode {
		return this._findVNodeByClass('header__search-input');
	}

	get searchResultsVNode(): VNode {
		return this._findVNodeByClass('header__search-pad');
	}

	get searchResultsHTML(): Element {
		return this._findHTML('.header__search-pad');
	}

	/**
	 * Rendering header with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render(): string {
		this._prerender();
		return this._render('Header.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._profilesSearch = this._config.profilesSearch.map((config) => {
			return new SearchResult(config, this);
		});
		this._groupsSearch = this._config.groupsSearch.map((config) => {
			return new SearchResult(config, this);
		});
		this._templateContext = {
			...this._templateContext,
			profilesSearch: this._profilesSearch.map((profileSearch) => {
				return profileSearch.render();
			}),
			groupsSearch: this._groupsSearch.map((groupSearch) => {
				return groupSearch.render();
			}),
		};
	}
}
