import { findVNodeByClass, VNode } from '../../modules/vdom';
import Component, { ComponentConfig } from '../Component';

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
}

/**
 * Class of header
 */
export class Header extends Component {
	protected _config: HeaderConfig;
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

	get menuOpener(): VNode {
		const vnode = findVNodeByClass(this.vnode, 'header__menu-opener');
		if (!vnode) {
			throw new Error('menu opener not found');
		}
		return vnode;
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
}
