import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';
import { FormButton, IFormButtonConfig } from '../FormButton/FormButton';
import { IInputConfig, Input } from '../Input/Input';
import { ITextAreaConfig, TextArea } from '../TextArea/TextArea';

export type ConfigInputs = Record<string, IInputConfig>;
export type ConfigInputsItems = [string, IInputConfig][];
export type ConfigTextAreas = Record<string, ITextAreaConfig>;
export type ConfigTextAreaItems = [string, ITextAreaConfig][];
export type Items = { [key: string]: IBaseComponent };

export interface IBaseFormConfig extends IBaseComponentConfig {
	inputs?: Record<string, IInputConfig>;
	button: IFormButtonConfig;
	textAreas?: Record<string, ITextAreaConfig>;
	error?: string;
}

export interface IBaseForm extends IBaseComponent {
	get configInputsItems(): ConfigInputsItems;
	get configTextAreaItems(): ConfigTextAreaItems;
	get items(): Items;
	get form(): HTMLElement;
}

export abstract class BaseForm extends BaseComponent implements IBaseForm {
	protected override _config: IBaseFormConfig;
	protected _inputs: Input[] = [];
	protected _textAreas: TextArea[] = [];
	protected _items: Items = {};
	private _configInputs: ConfigInputs = {};
	private _configTextAreas: ConfigTextAreas = {};
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
		if (config.inputs) {
			this._configInputs = config.inputs;
		}
		if (config.textAreas) {
			this._configTextAreas = config.textAreas;
		}
		this._configButton = config.button;
	}

	get formData(): FormData {
		return new FormData(this.form as HTMLFormElement);
	}

	/**
	 * Get inputs from config
	 *
	 * @returns {ConfigInputsItems} - array of input
	 */
	get configInputsItems(): ConfigInputsItems {
		return this._configInputs ? Object.entries(this._configInputs) : [];
	}

	get configTextAreaItems(): ConfigTextAreaItems {
		return this._configTextAreas
			? Object.entries(this._configTextAreas)
			: [];
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
		this.configTextAreaItems.forEach(([key, config]) => {
			const textArea = new TextArea(config, this);
			this._items[key] = textArea;
			this._textAreas.push(textArea);
		});
		const button = new FormButton(this._configButton, this);
		this._items.button = button;

		this._templateContext = {
			key: this._config?.key,
			inputs: this._inputs.map((input) => input.render(false)),
			button: button.render(false),
			textAreas: this._textAreas.map((textArea) =>
				textArea.render(false),
			),
			error: this._config?.error,
		};
	}

	abstract get form(): HTMLElement;
}
