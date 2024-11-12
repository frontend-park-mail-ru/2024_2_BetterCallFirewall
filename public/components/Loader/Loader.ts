import BaseComponent, { IBaseComponentConfig } from '../BaseComponent';

export class Loader extends BaseComponent {
	constructor(config: IBaseComponentConfig, parent: BaseComponent) {
		super(config, parent);
	}

	render(show: boolean = true): string {
		this._prerender();
		return this._render('Loader.hbs', show);
	}

	// show() {
	// 	this.htmlElement.className = 'loader';
	// }

	// hide() {
	// 	this.htmlElement.className = 'loader-hide';
	// }
}
