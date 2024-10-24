import { IBaseComponent } from '../BaseComponent';
import { BaseForm, IBaseForm, IBaseFormConfig } from '../BaseForm/BaseForm';
import { FormLink, IFormLinkConfig } from '../FormLink/FormLink';

export interface ILoginFormConfig extends IBaseFormConfig {
	toSignupLink: IFormLinkConfig;
}

export interface ILoginForm extends IBaseForm {}

export class LoginForm extends BaseForm implements ILoginForm {
	protected override _config: ILoginFormConfig;

	constructor(config: ILoginFormConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
	}

	get form(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'.form',
		) as HTMLElement;
		if (html) {
			return html;
		}
		throw new Error('form not found');
	}

	protected _prerender(): void {
		super._prerender();
		const toSignupLink = new FormLink(this._config?.toSignupLink, this);
		this._items.toSignupLink = toSignupLink;
		this._templateContext = {
			...this._templateContext,
			toSignupLink: toSignupLink.render(false),
		};
		console.log(this._templateContext);
	}

	render(): string {
		this._prerender();
		return this._render('LoginForm.hbs');
	}
}
