import 'handlebars';
import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';
import {
	FormButton,
	FormLink,
	IFormButtonConfig,
	IFormLinkConfig,
	IInputConfig,
	Input,
} from '../index';

type ConfigInputs = Record<string, IInputConfig>;
type ConfigInputsItems = [string, IInputConfig][];
type Items = { [key: string]: IBaseComponent };

export interface ISignupFormConfig extends IBaseComponentConfig {
	inputs: Record<string, IInputConfig>;
	button: IFormButtonConfig;
	toLoginLink: IFormLinkConfig;
}

export interface ISignupForm extends IBaseComponent {
	get configInputsItems(): ConfigInputsItems;
	get items(): Items;
}

export class SignupForm extends BaseComponent {
	protected override _config: ISignupFormConfig | null;
	private configInputs: ConfigInputs;
	private configButton;
	private inputs: Input[] = [];
	private _items: Items = {};

	/**
	 * constructor of instance SignupForm
	 *
	 * @param {ISignupFormConfig} config - configuration for the form
	 * @param {IBaseComponent} parent - the parent component
	 */
	constructor(config: ISignupFormConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
		this.configInputs = config.inputs;
		this.configButton = config.button;
	}

	/**
	 * Get inputs from config
	 *
	 * @returns {ConfigInputsItems} - array of input
	 */
	get configInputsItems(): ConfigInputsItems {
		return Object.entries(this.configInputs);
	}

	/**
	 * Getting items of this element
	 * @returns {Items}
	 */
	get items(): Items {
		return this._items;
	}

	/**
	 * Render signup form and submit event handler
	 *
	 * @returns {string} - HTML string of form
	 */
	render(): string {
		if (!this._config) {
			throw new Error('component has no config');
		}
		this.configInputsItems.forEach(([key, config]) => {
			const input = new Input(config);
			this._items[key] = input;
			this.inputs.push(input);
		});
		const button = new FormButton(this.configButton);
		this._items.button = button;
		const toLoginLink = new FormLink(this._config.toLoginLink);
		this._items.toLoginLink = toLoginLink;

		const template = Handlebars.templates['SignupForm.hbs'];
		const html = template({
			key: this._config.key,
			inputs: this.inputs.map((input) => input.render()),
			button: button.render(),
			toLoginLink: toLoginLink.render(),
		});
		this._parent?.htmlElement.insertAdjacentHTML('beforeend', html);
		this.inputs.forEach((input) => input.appendToComponent(this));
		button.appendToComponent(this);
		toLoginLink.appendToComponent(this);
		return html;
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
}
