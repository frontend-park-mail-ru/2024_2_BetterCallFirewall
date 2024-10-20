import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IFormButtonConfig extends IBaseComponentConfig {
	text: string;
}

export interface IFormButton extends IBaseComponent {}

/**
 * Class for form button
 */
export class FormButton extends BaseComponent implements IFormButton {
	protected override _config: IFormButtonConfig | null;

	/**
	 * Instance of FormButton
	 *
	 * @param {IFormButtonConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(
		config: IFormButtonConfig,
		parent: IBaseComponent | null = null,
	) {
		super(config, parent);
		this._config = config;
	}

	/**
	 * Rendering form button with handlebars
	 *
	 * @returns {string} - generated HTML element
	 */
	render(): string {
		const template = Handlebars.templates['FormButton.hbs'];
		const html = template(this._config);
		return html;
	}

	update(data: IFormButtonConfig): void {
		this._config = data;
	}
}
