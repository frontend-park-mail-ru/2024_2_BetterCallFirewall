import deepClone from '../../modules/deepClone';
import { ExtendedNode, Handler } from '../../modules/vdom';
import { Component, ComponentConfig } from '../Component';

export class Root extends Component {
	protected _config: ComponentConfig = { key: 'root' };
	private _documentHandlers: Handler[] = [];

	get node(): ExtendedNode {
		const element = document.getElementById('root') as ExtendedNode;
		if (!element) {
			throw new Error('root no found');
		}
		element._vnode = deepClone(this.vnode);
		return element;
	}

	addDocumentHandler(handler: Handler) {
		document.addEventListener(handler.event, handler.callback);
		this._documentHandlers.push(handler);
	}

	clear() {
		this.removeChildren();
		this._documentHandlers.forEach((handler) => {
			document.removeEventListener(handler.event, handler.callback);
		});
	}

	render(): string {
		this._prerender();
		return this._render('Root.hbs');
	}
}
