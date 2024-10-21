import { IBaseComponent } from '../BaseComponent';
import { BaseForm, IBaseForm, IBaseFormConfig } from '../BaseForm/BaseForm';
import { FormLink, IFormLinkConfig } from '../FormLink/FormLink';

export interface ISignupFormConfig extends IBaseFormConfig {
	toLoginLink: IFormLinkConfig;
}

export interface ISignupForm extends IBaseForm {}

export class SignupForm extends BaseForm implements ISignupForm {
	protected override _config: ISignupFormConfig;

	constructor(config: ISignupFormConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
	}

	protected _prerender(): void {
		super._prerender();
		const toLoginLink = new FormLink(this._config.toLoginLink, this);
		this._items.toLoginLink = toLoginLink;
		this._templateContext = {
			...this._templateContext,
			toLoginLink: toLoginLink.render(false),
		};
	}

	render(): string {
		this._prerender();
		return this._render('SignupForm.hbs');
	}
}
