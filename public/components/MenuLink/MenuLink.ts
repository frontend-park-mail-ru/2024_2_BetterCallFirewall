import { Component, ComponentConfig } from '../Component';

export interface MenuLinkConfig extends ComponentConfig {
	text: string;
	href: string;
	icon: string;
	active?: boolean;
}

export interface IMenuLink extends Component {}

export default class MenuLink extends Component {
	protected _config: MenuLinkConfig;

	constructor(config: MenuLinkConfig, parent: Component | null = null) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('MenuLink.hbs');
	}
}
