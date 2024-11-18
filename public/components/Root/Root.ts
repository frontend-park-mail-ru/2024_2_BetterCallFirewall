// import BaseComponent from '../BaseComponent';

// export class Root extends BaseComponent {
// 	/**
// 	 * Возвращает html-элемент с id='root'
// 	 * @returns {HTMLElement}
// 	 */
// 	override get htmlElement() {
// 		const html = document.getElementById('root');
// 		if (html) {
// 			return html;
// 		}
// 		throw new Error('root does not found');
// 	}

// 	/**
// 	 * Не использовать этот метод, в нем нет смысла
// 	 * @returns {string}
// 	 */
// 	render(): string {
// 		return '';
// 	}
// }

import deepClone from '../../modules/deepClone';
import { ExtendedNode } from '../../modules/vdom';
import Component, { ComponentConfig } from '../Component';

export class Root extends Component {
	protected _config: ComponentConfig = { key: 'root' };

	get node(): ExtendedNode {
		const element = document.getElementById('root') as ExtendedNode;
		if (!element) {
			throw new Error('root no found');
		}
		element._vnode = deepClone(this.vnode);
		return element;
	}

	render(): string {
		this._prerender();
		return this._render('Root.hbs');
	}
}
