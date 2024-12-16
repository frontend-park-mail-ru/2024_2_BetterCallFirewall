import { ActionProfileChangePassword } from '../../actions/actionProfileEdit';
import { ChangePasswordPayload } from '../../models/profile';
import Validator from '../../modules/validation';
import { BaseForm, BaseFormConfig, ConfigInputs } from '../BaseForm/BaseForm';
import { Component } from '../Component';
import { InputConfig } from '../Input/Input';

export interface ChangePasswordFormInputs extends ConfigInputs {
	oldPassword: InputConfig;
	newPassword: InputConfig;
	repeatPassword: InputConfig;
}

export interface ChangePasswordFormConfig extends BaseFormConfig {
	inputs: ChangePasswordFormInputs;
}

export class ChangePasswordForm extends BaseForm {
	protected _config: ChangePasswordFormConfig;

	constructor(config: ChangePasswordFormConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get form(): HTMLFormElement {
		return this._findVNodeByKey('form').element as HTMLFormElement;
	}

	protected _addHandlers(): void {
		super._addHandlers();
		this.vnode.handlers.push({
			event: 'submit',
			callback: (event) => {
				event.preventDefault();
				const validator = new Validator();
				const formData = validator.validateForm(
					this.formData,
					this.form,
				);
				if (formData) {
					const inputs = this._config.inputs;
					const changePasswordPayload: ChangePasswordPayload = {
						old_password: formData.get(
							inputs.oldPassword.name,
						) as string,
						new_password: formData.get(
							inputs.newPassword.name,
						) as string,
					};
					this._sendAction(
						new ActionProfileChangePassword(changePasswordPayload),
					);
				}
			},
		});
	}

	render(): string {
		this._prerender();
		return this._render('ChangePasswordForm.hbs');
	}
}
