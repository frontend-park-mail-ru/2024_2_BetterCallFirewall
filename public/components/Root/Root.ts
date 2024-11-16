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

import Component, { ComponentConfig } from '../Component';

export class Root extends Component {
	protected _config: ComponentConfig = { key: 'root' };

	get node(): Element {
		const element = document.getElementById('root');
		if (!element) {
			throw new Error('root no found');
		}
		return element;
	}

	render(): string {
		this._prerender();
		return this._render('Root.hbs');
	}
}
