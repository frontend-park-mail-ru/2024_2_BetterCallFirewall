import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IInputConfig extends IBaseComponentConfig {
	name: string;
	text: string;
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
	render(): string {
		const template = Handlebars.templates['Input.hbs'];
		const html = template(this._config);
		return html;
	}

	update(data: IInputConfig): void {
		this._config = data;
	}
}
