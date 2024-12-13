import { Action } from '../actions/action';
import dispatcher from '../dispatcher/dispatcher';
import {
	findVNodeByClass,
	findVNodeByKey,
	Handler,
	VNode,
	vNodesFromString,
} from '../modules/vdom';

export interface ComponentConfig {
	key: string;
}

export default abstract class Component {
	protected _config: ComponentConfig | null;
	protected _parent: Component | null;
	protected _templateContext: object = {};
	protected _children: Component[] = [];
	private _vnode?: VNode;
	private _handlers: Handler[] = [];

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
		if (this._parent) {
			const vnode = findVNodeByKey(this._parent.vnode, this.config.key);
			if (!vnode) {
				throw new Error('vnode not found');
			}
			this._vnode = vnode;
			return this._vnode;
		}
		if (this._vnode) {
			return this._vnode;
		}
		return this.newVNode();
	}

	newVNode(html?: string): VNode {
		const vnode = vNodesFromString(html ? html : this.render())[0];
		if (typeof vnode === 'string') {
			throw new Error('this is string node');
		}
		this._vnode = vnode;
		this._addHandlers();
		return this._vnode;
	}

	addChild(child: Component) {
		this._children.push(child);
	}

	removeChildren() {
		this._children = [];
	}

	protected _addHandlers() {
		this._children.forEach((child) => {
			child._addHandlers();
		});
	}

	protected _render(templateFile: string): string {
		const template = Handlebars.templates[templateFile];
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

	protected _findVNodeByKey(key: string): VNode {
		return checkVNode(findVNodeByKey(this.vnode, key));
	}

	protected _findVNodeByClass(className: string) {
		return checkVNode(findVNodeByClass(this.vnode, className));
	}

	protected _findHTML(selector: string) {
		return checkElement(document.querySelector(selector));
	}

	protected _sendAction(action: Action) {
		dispatcher.getAction(action);
	}

	abstract render(): string;
}

const checkVNode = (vnode?: VNode) => {
	if (!vnode) {
		throw new Error('vnode not found');
	}
	return vnode;
};

const checkElement = (node: Element | null) => {
	if (!node) {
		throw new Error('element not found');
	}
	return node;
};
