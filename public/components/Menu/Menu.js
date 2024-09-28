import MenuLink from '../MenuLink/MenuLink.js';

export default class Menu {
	#config;
	#parent;
	#className;
	#links = [];
	#handlers = {};
	/**
	 *
	 * @param {Object} config
	 * @param {HTMLElement} parent
	 */
	constructor(config, parent) {
		this.#config = config;
		this.#parent = parent;
		this.#className = 'menu';
	}
	get configItems() {
		return Object.entries(this.#config);
	}
	get htmlElement() {
		return this.#parent.querySelector(`div.${this.#className}`);
	}
	render() {
		this.configItems.forEach(([key, value]) => {
			const link = new MenuLink({ key, ...value });
			this.#links.push(link);
		});
		const template = Handlebars.templates['Menu.hbs'];
		const html = template({
			className: this.#className,
			links: this.#links.map((link) => link.render()),
		});
		this.#parent.innerHTML += html;
		this.#links.forEach((link) => {
			link.parent = this.htmlElement;
		});
		return html;
	}
	/**
	 *
	 * @param {HTMLElement} target
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
	removeHandlers() {
		Object.entries(this.#handlers).forEach(
			([, { target, event, handler }]) => {
				target.removeEventListener(event, handler);
			},
		);
	}
	remove() {
		this.removeHandlers();
		this.#links.forEach((link) => {
			link.remove();
		});
		this.htmlElement.remove();
	}
}
