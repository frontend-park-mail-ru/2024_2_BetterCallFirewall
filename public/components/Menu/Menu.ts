import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';
import { MenuLink, IMenuLink, IMenuLinkConfig } from '../MenuLink/MenuLink';

type TitleConfig = {
	key: string;
	text: string;
	href: string;
};
type LinksConfig = [string, IMenuLinkConfig][];
type Links = IMenuLink[];

export interface IMenuConfig extends IBaseComponentConfig {
	title: TitleConfig;
	links: Record<string, IMenuLinkConfig>;
}

export interface IMenu extends IBaseComponent {}

/**
 * Class to menu navigation
 */
export class Menu extends BaseComponent implements IMenu {
	protected override _config: IMenuConfig | null;
	private links: Links = [];

	/**
	 * Создает новый компонент меню
	 * @param {IMenuConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IMenuConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
	}

	/**
	 * Getting configs of links
	 * @returns {ArrayLike<[string, Object]>}
	 */
	get linksConfig(): LinksConfig {
		if (!this._config) {
			throw new Error('component has no config');
		}
		return Object.entries(this._config.links);
	}

	/**
	 * Rendering menu and add to parent elem
	 *
	 * @returns {string}
	 */
	render(): string {
		// const template = Handlebars.templates['Menu.hbs'];
		// const html = template(this._templateContext);

		// const wrapper = document.createElement('div');
		// wrapper.innerHTML = html;
		// const element = wrapper.firstElementChild;
		// if (element) {
		// 	this._htmlElement = element as HTMLElement;
		// }
		// this.links.forEach((link) => {
		// 	link.appendToComponent(this);
		// });

		// if (this.parent) {
		// 	this.parent.htmlElement.insertAdjacentHTML('beforeend', html);
		// }
		// return html;
		this._prerender();
		return this._render('Menu.hbs');
	}

	remove(): void {
		super.remove();
		this.links = [];
	}

	update(data: IMenuConfig) {
		this._config = data;
	}

	protected _prerender(): void {
		if (!this._config) {
			throw new Error('component has no config');
		}
		this.linksConfig.forEach(([, value]) => {
			const link = new MenuLink(value);
			this.links.push(link);
		});
		this._templateContext = {
			...this._config,
			title: this._config.title,
			links: this.links.map((link) => link.render()),
		};
	}
}
