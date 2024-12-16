import { VNode } from '../../modules/vdom';
import { BaseForm, BaseFormConfig, ConfigInputs } from '../BaseForm/BaseForm';
import { Component } from '../Component';
import { InputConfig } from '../Input/Input';

export interface ProfileEditFormInputs extends ConfigInputs {
	firstName: InputConfig;
	secondName: InputConfig;
	description: InputConfig;
	avatar: InputConfig;
}

export interface IProfileEditFormConfig extends BaseFormConfig {
	inputs: ProfileEditFormInputs;
}

export class ProfileEditForm extends BaseForm {
	protected override _config: IProfileEditFormConfig;

	constructor(config: IProfileEditFormConfig, parent: Component) {
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
			className: 'edit-profile',
		};
	}

	render(): string {
		this._prerender();
		return this._render('ProfileEditForm.hbs');
	}
}
