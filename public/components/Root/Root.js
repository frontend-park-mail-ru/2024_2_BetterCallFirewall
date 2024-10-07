import BaseComponent from '../BaseComponent.js';

export default class Root extends BaseComponent {
	/**
	 * Возвращает html-элемент с id='root'
	 * @returns {HTMLElement}
	 */
	get htmlElement() {
		const html = document.getElementById('root');
		if (html) {
			return html;
		}
		throw new Error('root does not found');
	}
}
