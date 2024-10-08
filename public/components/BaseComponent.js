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
	constructor(config = null, parent = null) {
		this.#config = config;
		if (parent) {
			this.#parent = parent;
			this.appendToComponent(parent);
		}
	}

	/**
	 * Возвращет уникальный в пределах родителя ключ компонента
	 * @returns {string}
	 */
	get key() {
		return this.#config.key;
	}

	/**
	 * Возвращает конфигурационный объект компонента
	 * @returns {Object}
	 */
	get config() {
		return this.#config;
	}

	/**
	 * Возвращает родителя компонента
	 * @returns {BaseComponent}
	 */
	get parent() {
		return this.#parent;
	}

	/**
	 * Возвращает компонент в виде html-элемента
	 * @returns {HTMLElement}
	 */
	get htmlElement() {
		if (this.#parent) {
			const html = this.#parent.htmlElement.querySelector(
				`[data-key="${this.key}"]`,
			);
			if (html) {
				return html;
			}
			throw new Error('Component not found');
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
	 * Добавляет компонент к html-элементу parent. Применять для root, либо вручную добавлять этот компонент в качестве ребенка
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
		if (target.dataset && target.dataset['key']) {
			this.#handlers[
				`${target.className}-${target.dataset['key']}-${event}`
			] = {
				target,
				event,
				handler,
			};
		} else {
			this.#handlers[`${target.className}-${event}`] = {
				target,
				event,
				handler,
			};
		}
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

	/**
	 * Удаляет компонент и всех его потомков
	 */
	remove() {
		this.removeHandlers();
		Object.entries(this.#children).forEach(([, child]) => {
			child.remove();
		});
		this.htmlElement.outerHTML = '';
		if (this.parent) {
			delete this.parent.#children[this.key];
		}
	}
}
