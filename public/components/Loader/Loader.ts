import BaseComponent, { IBaseComponentConfig } from '../BaseComponent';

export class Loader extends BaseComponent {
	protected _config: IBaseComponentConfig = { key: 'loader' };

	render(show: boolean): string {
		this._prerender();
		return this._render('Loader.hbs', show);
	}

	show() {
		this.htmlElement.className = 'loader';
	}

	hide() {
		this.htmlElement.className = 'loader-hide';
	}
}
