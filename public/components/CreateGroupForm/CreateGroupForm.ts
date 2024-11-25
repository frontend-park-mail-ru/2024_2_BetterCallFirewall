import { VNode } from '../../modules/vdom';
import { BaseForm, BaseFormConfig, ConfigInputs } from '../BaseForm/BaseForm';
import Component from '../Component';
import { InputConfig } from '../Input/Input';

export interface CreateGroupFormInputs extends ConfigInputs {
	name: InputConfig;
	description: InputConfig;
	avatar: InputConfig;
}

export interface ICreateGroupFormConfig extends BaseFormConfig {
	inputs: CreateGroupFormInputs;
}

export class CreateGroupForm extends BaseForm {
	protected override _config: ICreateGroupFormConfig;

	constructor(config: ICreateGroupFormConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get form(): HTMLElement {
		const html = document.querySelector('.form') as HTMLElement;
		if (html) {
			return html;
		}
		throw new Error('form not found');
	}

	get fileInput(): HTMLElement {
		const html = document.querySelector(
			'input[type="file"]',
		) as HTMLElement;
		if (!html) {
			throw new Error('input file not found');
		}
		return html;
	}

	get fileInputVNode(): VNode {
		return this._findVNodeByKey(this._config.inputs.avatar.key);
	}

	get label(): HTMLElement {
		const html = document.querySelector('.form__upload') as HTMLElement;
		if (!html) {
			throw new Error('label not found');
		}
		return html;
	}

	get img(): HTMLElement {
		const html = document.querySelector('.form__img') as HTMLElement;
		if (!html) {
			throw new Error('label not found');
		}
		return html;
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = {
			...this._templateContext,
			className: 'create-group',
		};
	}

	render(): string {
		this._prerender();
		return this._render('CreateGroupForm.hbs');
	}

	clearError() {
		const messageElement = document.querySelector('.form__error');
		if (!messageElement) {
			throw new Error('message element not found');
		}
		messageElement.textContent = '';
	}

	printError(error: string) {
		if (error) {
			const messageElement = document.querySelector('.form__error');
			if (!messageElement) {
				throw new Error('message element not found');
			}
			messageElement.textContent = error;
		}
	}
}
