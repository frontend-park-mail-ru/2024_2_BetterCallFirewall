import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent.ts';
import { MenuLink, IMenuLink, IMenuLinkConfig } from '../MenuLink/MenuLink.ts';

type TitleConfig = {
	key: string;
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
	protected override config: IMenuConfig | null;
	private links: Links = [];

	/**
	 * Создает новый компонент меню
	 * @param {IMenuConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IMenuConfig, parent: IBaseComponent) {
		super(config, parent);
		this.config = config;
	}

	/**
	 * Getting configs of links
	 * @returns {ArrayLike<[string, Object]>}
	 */
	get linksConfig(): LinksConfig {
		if (!this.config) {
			throw new Error('component has no config');
		}
		return Object.entries(this.config.links);
	}

	/**
	 * Rendering menu and add to parent elem
	 *
	 * @returns {string}
	 */
	render(): string {
		if (!this.config) {
			throw new Error('conponent has no config');
		}
		this.linksConfig.forEach(([, value]) => {
			const link = new MenuLink(value);
			this.links.push(link);
		});
		const template = Handlebars.templates['Menu.hbs'];
		const html = template({
			...this.config,
			title: this.config.title,
			links: this.links.map((link) => link.render()),
		});
		if (this.parent) {
			this.parent.htmlElement.insertAdjacentHTML('beforeend', html);
			this.links.forEach((link) => {
				this.addChild(link);
			});
		}
		return html;
	}
}
