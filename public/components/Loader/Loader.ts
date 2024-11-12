import BaseComponent from '../BaseComponent';

export class Loader extends BaseComponent {
	render(show: boolean): string {
		return this._render('Loader.hbs', show);
	}

	show() {
		this.htmlElement.className = 'loader';
	}

	hide() {
		this.htmlElement.className = 'loader-hide';
	}
}
