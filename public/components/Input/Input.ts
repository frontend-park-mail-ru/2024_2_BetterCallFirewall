import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IInputConfig extends IBaseComponentConfig {
	name?: string;
	text?: string;
	accept?: string;
	extra?: string;
	type: string;
	validator: (name: HTMLInputElement) => string;
}

export interface IInput extends IBaseComponent {}

/**
 * Class of input
 */
export class Input extends BaseComponent implements IInput {
	protected override _config: IInputConfig | null;

	/**
	 * Instance of Input
	 *
	 * @param {IInputConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IInputConfig, parent: IBaseComponent | null = null) {
		super(config, parent);
		this._config = config;
	}

	/**
	 * Rendering input with handlebars
	 *
	 * @returns {string} - generated HTML element of input
	 */
	render(show: boolean = true): string {
		this._prerender();
		return this._render('Input.hbs', show);
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = this.config;
	}
}
