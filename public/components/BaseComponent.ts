type Children = Record<string, IBaseComponent>;
type Handlers = Record<
	string,
	{ target: HTMLElement | Document; event: string; handler: EventListener }
>;

export interface IBaseComponentConfig {
	key: string;
}

export interface IBaseComponent {
	get key(): string;
	get htmlElement(): HTMLElement;
	get children(): Children;
	render(): string;
	appendToComponent(parent: IBaseComponent): void;
	addChild(child: IBaseComponent): void;
	removeHandlers(): void;
	addHandler(
		target: HTMLElement,
		event: string,
		handler: (event: Event) => void,
	): void;
	remove(): void;
}

export default abstract class BaseComponent implements IBaseComponent {
	protected config: IBaseComponentConfig | null;
	protected parent: IBaseComponent | null;
	protected _children: Children = {};
	private handlers: Handlers = {};

	/**
	 * Создает новый компонент
	 * @param {IBaseComponentConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(
		config: IBaseComponentConfig | null = null,
		parent: IBaseComponent | null = null,
	) {
		this.config = config;
		this.parent = parent;
		if (parent) {
			this.appendToComponent(parent);
		}
	}

	/**
	 * Возвращет уникальный в пределах родителя ключ компонента
	 * @returns {string}
	 */
	get key(): string {
		if (!this.config) {
			throw new Error('component has no key');
		}
		return this.config.key;
	}

	/**
	 * Возвращает компонент в виде html-элемента
	 * @returns {HTMLElement}
	 */
	get htmlElement(): HTMLElement {
		if (this.parent) {
			const html = this.parent.htmlElement.querySelector(
				`[data-key="${this.key}"]`,
			) as HTMLElement;
			if (html) {
				return html;
			}
			throw new Error('Component not found');
		}
		throw new Error('Component has no parent');
	}

	/**
	 * Возвращает потомков этого компонента
	 * @returns {Children}
	 */
	get children(): Children {
		return this._children;
	}

	/**
	 * Добавляет родителя-компонент этому компоненту
	 * @param {IBaseComponent} parent
	 */
	appendToComponent(parent: IBaseComponent) {
		this.parent = parent;
		parent.addChild(this);
	}

	/**
	 * Добавляет потомка-компонент этому компоненту
	 *
	 * При этом потомок не будет знать о родительском компоненте
	 * @param {IBaseComponent} child
	 */
	addChild(child: IBaseComponent) {
		this._children[child.key] = child;
	}

	/**
	 * Навешивает обработчик handler события event на target
	 * @param {HTMLElement} target
	 * @param {string} event
	 * @param {function(Event): void} handler
	 */
	addHandler(
		target: HTMLElement | Document,
		event: string,
		handler:
			| ((event: Event) => void)
			| ((event: Event) => Promise<void>)
			| (() => void)
			| (() => Promise<void>),
	) {
		target.addEventListener(event, handler);
		if (target === document) {
			this.handlers[`document-${event}`] = {
				target,
				event,
				handler,
			};
			return;
		}
		target = target as HTMLElement;
		if (target.dataset && target.dataset['key']) {
			this.handlers[
				`${target.className}-${target.dataset['key']}-${event}`
			] = {
				target,
				event,
				handler,
			};
		} else {
			this.handlers[`${target.className}-${event}`] = {
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
		Object.entries(this.handlers).forEach(
			([key, { target, event, handler }]) => {
				target.removeEventListener(event, handler);
				delete this.handlers[key];
			},
		);
	}

	/**
	 * Удаляет компонент и всех его потомков
	 */
	remove() {
		this.removeHandlers();
		Object.entries(this._children).forEach(([, child]) => {
			child.remove();
		});
		this.htmlElement.outerHTML = '';
		if (this.parent) {
			delete this.parent.children[this.key];
		}
	}

	abstract render(): string;
}
