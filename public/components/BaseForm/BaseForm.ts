import {
	findVNodebyTagName,
	findVNodebyTagNameAll,
	VNode,
} from '../../modules/vdom';
import Component, { ComponentConfig } from '../Component';
import { FormButton, FormButtonConfig } from '../FormButton/FormButton';
import { InputConfig, Input } from '../Input/Input';
import { TextAreaConfig, TextArea } from '../TextArea/TextArea';

export type ConfigInputs = Record<string, InputConfig>;
export type ConfigInputsItems = [string, InputConfig][];
export type ConfigTextAreas = Record<string, TextAreaConfig>;
export type ConfigTextAreaItems = [string, TextAreaConfig][];
export type Items = { [key: string]: Component };

export interface BaseFormConfig extends ComponentConfig {
	inputs?: Record<string, InputConfig>;
	button: FormButtonConfig;
	textAreas?: Record<string, TextAreaConfig>;
	error?: string;
}

export abstract class BaseForm extends Component {
	protected override _config: BaseFormConfig;
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
	constructor(config: BaseFormConfig, parent: Component) {
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

	get formVNode(): VNode {
		const vnode = findVNodebyTagName(this.vnode, 'form');
		if (!vnode) {
			throw new Error('form vnode not found');
		}
		return vnode;
	}

	get textInputFieldsVNodes(): VNode[] {
		const vnodes: VNode[] = [];
		vnodes.push(...findVNodebyTagNameAll(this.vnode, 'input'));
		vnodes.push(...findVNodebyTagNameAll(this.vnode, 'textarea'));
		return vnodes;
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
			key: this._config.key,
			inputs: this._inputs.map((input) => input.render()),
			button: button.render(),
			textAreas: this._textAreas.map((textArea) => textArea.render()),
			error: this._config.error,
		};
	}

	abstract get form(): HTMLElement;
}
