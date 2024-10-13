import BaseComponent, { IBaseComponent, TConfig } from '../BaseComponent';

export interface IFormButtonConfig extends TConfig {
	text: string;
}

export interface IFormButton extends IBaseComponent {}

/**
 * Class for form button
 */
export class FormButton extends BaseComponent implements IFormButton {
	/**
	 * Instance of FormButton
	 *
	 * @param {IFormButtonConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IFormButtonConfig, parent: IBaseComponent) {
		super(config, parent);
	}

	/**
	 * Rendering form button with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render(): string {
		const template = Handlebars.templates['FormButton.hbs'];
		const html = template(this.config);
		return html;
	}
}
