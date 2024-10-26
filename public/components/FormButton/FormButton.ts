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
	render(show: boolean = true): string {
		this._prerender();
		return this._render('FormButton.hbs', show);
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = this.config;
	}
}
