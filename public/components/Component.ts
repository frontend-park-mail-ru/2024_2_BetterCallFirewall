import { VNode, vNodesFromString } from '../modules/vdom';

export interface ComponentConfig {
	key: string;
}

export default abstract class Component {
	protected _config: ComponentConfig | null;
	protected _parent: Component | null;
	protected _templateContext: object = {};
	protected _children: Component[] = [];

	constructor(
		config: ComponentConfig | null = null,
		parent: Component | null = null,
	) {
		this._config = config;
		this._parent = parent;
		this._parent?.addChild(this);
	}

	get key(): string {
		if (!this._config) {
			throw new Error('component has no key');
		}
		return this._config.key;
	}

	get config(): ComponentConfig {
		if (this._config) {
			return this._config;
		}
		throw new Error('component has no config');
	}

	get vnode(): VNode {
		const node = vNodesFromString(this.render())[0];
		if (typeof node === 'string') {
			throw new Error('this is string node');
		}
		return node;
	}

	addChild(child: Component) {
		this._children.push(child);
	}

	removeChildren() {
		this._children = [];
	}

	protected _render(templateFile: string): string {
		const template = Handlebars.templates[templateFile];
		console.log(
			'Component._render(): templateContext:',
			this._templateContext,
		);
		return template(this._templateContext);
	}

	protected _prerender(): void {
		this._templateContext = {
			...this.config,
			children: this._children.map((child) => {
				return child.render();
			}),
		};
	}

	abstract render(): string;
}
