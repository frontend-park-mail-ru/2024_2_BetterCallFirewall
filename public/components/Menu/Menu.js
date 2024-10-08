import MenuLink from '../MenuLink/MenuLink.js';

/**
 * Class to menu navigation
 */
export default class Menu {
	#config;
	#parent;
	#className;
	#links = [];
	#handlers = {};
	/**
	 * Instance of Menu
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
		this.#className = 'menu';
	}

	/**
	 * Getting configs of links
	 * @returns {ArrayLike<[string, Object]}
	 */
	get linksConfig() {
		return Object.entries(this.#config.links);
	}
	/**
	 * Getting html element
	 */
	get htmlElement() {
		return this.#parent.querySelector(`div.${this.#className}`);
	}
	/**
	 * Rendering menu and add to parent elem
	 *
	 * @returns {string}
	 */
	render() {
		this.linksConfig.forEach(([key, value]) => {
			const link = new MenuLink({ key, ...value });
			this.#links.push(link);
		});
		const template = Handlebars.templates['Menu.hbs'];
		const html = template({
			className: this.#className,
			title: this.#config.title,
			links: this.#links.map((link) => link.render()),
		});
		this.#parent.innerHTML += html;
		this.#links.forEach((link) => {
			link.parent = this.htmlElement;
		});
		return html;
	}
	/**
	 * Adding event handler to target
	 *
	 * @param {HTMLElement} target - main element to add handler
	 * @param {string} event
	 * @param {(Event) => {}} handler
	 */
	addHandler(target, event, handler) {
		target.addEventListener(event, handler);
		this.#handlers[`${target.dataset['section']}-${event}`] = {
			target,
			event,
			handler,
		};
	}
	/**
	 * Deleting all event handlers
	 */
	removeHandlers() {
		Object.entries(this.#handlers).forEach(
			([key, { target, event, handler }]) => {
				target.removeEventListener(event, handler);
				delete this.#handlers[key];
			},
		);
	}
	/**
	 * Deleting Menu element and handlers
	 */
	remove() {
		this.removeHandlers();
		this.#links.forEach((link) => {
			link.remove();
		});
		this.htmlElement.remove();
	}
}
