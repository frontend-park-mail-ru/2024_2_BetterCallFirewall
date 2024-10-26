import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';
import { FormButton, IFormButtonConfig } from '../FormButton/FormButton';
import { IInputConfig, Input } from '../Input/Input';

export type ConfigInputs = Record<string, IInputConfig>;
export type ConfigInputsItems = [string, IInputConfig][];
export type Items = { [key: string]: IBaseComponent };

export interface IBaseFormConfig extends IBaseComponentConfig {
	inputs: Record<string, IInputConfig>;
	button: IFormButtonConfig;
	error?: string;
}

export interface IBaseForm extends IBaseComponent {
	get configInputsItems(): ConfigInputsItems;
	get items(): Items;
}

export abstract class BaseForm extends BaseComponent implements IBaseForm {
	protected override _config: IBaseFormConfig;
	protected _inputs: Input[] = [];
	protected _items: Items = {};
	private _configInputs: ConfigInputs;
	private _configButton;

	/**
	 * constructor of instance BaseForm
	 *
	 * @param {ILoginFormConfig} config - configuration for the form
	 * @param {IBaseComponent} parent - the parent HTML element
	 */
	constructor(config: IBaseFormConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
		this._configInputs = config.inputs;
		this._configButton = config.button;
	}

	/**
	 * Get inputs from config
	 *
	 * @returns {ConfigInputsItems} - array of input
	 */
	get configInputsItems(): ConfigInputsItems {
		return Object.entries(this._configInputs);
	}

	/**
	 * Getting items of this element
	 * @returns {Items}
	 */
	get items(): Items {
		return this._items;
	}

	/**
	 * Printing error above submit button
	 * @param {string} error
	 */
	printError(error: string) {
		if (error) {
			const messageElement =
				this.htmlElement.querySelector('.error-message');
			if (!messageElement) {
				throw new Error('message element not found');
			}
			messageElement.textContent = error;
		}
	}

	/**
	 * Clear error above submit button
	 */
	clearError() {
		const messageElement = this.htmlElement.querySelector('.error-message');
		if (!messageElement) {
			throw new Error('message element not found');
		}
		messageElement.textContent = '';
	}

	protected _prerender(): void {
		super._prerender();
		this.configInputsItems.forEach(([key, config]) => {
			const input = new Input(config, this);
			this._items[key] = input;
			this._inputs.push(input);
		});
		const button = new FormButton(this._configButton, this);
		this._items.button = button;

		this._templateContext = {
			key: this._config?.key,
			inputs: this._inputs.map((input) => input.render(false)),
			button: button.render(false),
			error: this._config?.error
		};
	}
}
