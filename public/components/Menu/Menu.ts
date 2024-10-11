import BaseComponent from '../BaseComponent';
import MenuLink from '../MenuLink/MenuLink';

/**
 * Class to menu navigation
 */
export default class Menu extends BaseComponent {
	#links = [];

	/**
	 * Создает новый компонент меню
	 * @param {Object} config
	 * @param {BaseComponent} parent
	 */
	constructor(config: any, parent: HTMLElement) {
		super(config, parent);
	}

	/**
	 * Getting configs of links
	 * @returns {ArrayLike<[string, Object]}
	 */
	get linksConfig() {
		return Object.entries(this.config.links);
	}

	/**
	 * Rendering menu and add to parent elem
	 *
	 * @returns {string}
	 */
	render() {
		this.linksConfig.forEach(([key, value]) => {
			const link = new MenuLink({ key, ...value }, this.htmlElement);
			this.#links.push(link);
		});
		const template = Handlebars.templates['Menu.hbs'];
		const html = template({
			...this.config,
			title: this.config.title,
			links: this.#links.map((link) => link.render()),
		});
		this.parent.htmlElement.innerHTML += html;
		this.#links.forEach((link) => {
			link.parent = this.htmlElement;
		});
		return html;
	}
}
