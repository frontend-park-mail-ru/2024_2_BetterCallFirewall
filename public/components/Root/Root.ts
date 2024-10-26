import BaseComponent, { IBaseComponent } from '../BaseComponent';

export interface IRoot extends IBaseComponent {}

export class Root extends BaseComponent implements IRoot {
	/**
	 * Возвращает html-элемент с id='root'
	 * @returns {HTMLElement}
	 */
	override get htmlElement() {
		const html = document.getElementById('root');
		if (html) {
			return html;
		}
		throw new Error('root does not found');
	}

	/**
	 * Не использовать этот метод, в нем нет смысла
	 * @returns {string}
	 */
	render(): string {
		return '';
	}
}
