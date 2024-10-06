/**
 * Описание конфига компонентов
 * @typedef ComponentConfig
 * @property {string} key - Уникальный в рамках родителя этого компонента ключ
 */

export default class BaseComponent {
	#config = {};
	#parent;
	#children = {};
	#handlers = {};

	/**
	 * Создает новый компонент
	 * @param {ComponentConfig} config
	 * @param {BaseComponent} parent
	 */
	constructor(config, parent = null) {
		this.#config = config;
		this.#parent = parent;
	}

	/**
	 * Возвращет уникальный в пределах родителя ключ компонента
	 * @returns {string}
	 */
	get key() {
		return this.#config.key;
	}

	/**
	 * Возвращает компонент в виде html-элемента
	 * @returns {HTMLElement}
	 */
	get html() {
		if (this.#parent) {
			return this.#parent.html.querySelector(`data-key="${this.key}"`);
		}
		throw new Error('Component has no parent');
	}

	/**
	 * Добавляет родителя-компонент этому компоненту
	 * @param {BaseComponent} parent
	 */
	appendToComponent(parent) {
		this.#parent = parent;
		parent.addChild(this);
	}

	/**
	 * Добавляет компонент к html-элементу parent
	 * @param {HTMLElement} parent
	 */
	appendToHTML(parent) {
		parent.textContent += parent;
	}

	/**
	 * Добавляет ребенка-компонент этому компоненту
	 * @param {BaseComponent} child
	 */
	addChild(child) {
		this.#children[child.key] = child;
	}

	/**
	 * Навешивает обработчик handler события event на target
	 * @param {HTMLElement} target
	 * @param {string} event
	 * @param {function(Event): void} handler
	 */
	addHandler(target, event, handler) {
		target.addEventListener(event, handler);
		this.#handlers[
			`${target.className}-${target.dataset['key']}-${event}`
		] = {
			target,
			event,
			handler,
		};
	}

	/**
	 * Удаляет все обработчики, записанные в этом компоненте
	 */
	removeHandlers() {
		Object.entries(this.#handlers).forEach(
			([key, { target, event, handler }]) => {
				target.removeEventListener(event, handler);
				delete this.#handlers[key];
			},
		);
	}
}
