// import { IBaseComponent } from '../BaseComponent';
// import { BaseForm, IBaseForm, BaseFormConfig } from '../BaseForm/BaseForm';
// import { FormLink, IFormLinkConfig } from '../FormLink/FormLink';
// import { InputConfig } from '../Input/Input';

// export interface ISignupFormConfig extends BaseFormConfig {
// 	inputs: {
// 		firstName: InputConfig;
// 		secondName: InputConfig;
// 		email: InputConfig;
// 		password: InputConfig;
// 		passwordAgain: InputConfig;
// 	};
// 	toLoginLink: IFormLinkConfig;
// }

// export interface ISignupForm extends IBaseForm {}

// export class SignupForm extends BaseForm implements ISignupForm {
// 	protected override _config: ISignupFormConfig;

// 	constructor(config: ISignupFormConfig, parent: IBaseComponent) {
// 		super(config, parent);
// 		this._config = config;
// 	}

// 	get config(): ISignupFormConfig {
// 		return this._config;
// 	}

// 	get form(): HTMLElement {
// 		const html = this.htmlElement.querySelector('.form') as HTMLElement;
// 		if (html) {
// 			return html;
// 		}
// 		throw new Error('form not found');
// 	}

// 	protected _prerender(): void {
// 		super._prerender();
// 		const toLoginLink = new FormLink(this._config.toLoginLink, this);
// 		this._items.toLoginLink = toLoginLink;
// 		this._templateContext = {
// 			...this._templateContext,
// 			toLoginLink: toLoginLink.render(false),
// 		};
// 	}

// 	render(): string {
// 		this._prerender();
// 		this._render('SignupForm.hbs');

// 		const toLoginLinkHTML = this.htmlElement.querySelector(
// 			`[data-key=${this._config.toLoginLink.key}]`,
// 		);
// 		if (!toLoginLinkHTML) {
// 			throw new Error('toLoginLinkHTML not found');
// 		}
// 		this.items.toLoginLink.htmlElement = toLoginLinkHTML as HTMLElement;

// 		return this.htmlElement.outerHTML;
// 	}
// }

import { BaseForm, BaseFormConfig } from '../BaseForm/BaseForm';
import Component from '../Component';
import { FormLink, FormLinkConfig } from '../FormLink/FormLink';
import { InputConfig } from '../Input/Input';

export interface ISignupFormConfig extends BaseFormConfig {
	inputs: {
		firstName: InputConfig;
		secondName: InputConfig;
		email: InputConfig;
		password: InputConfig;
		passwordAgain: InputConfig;
	};
	toLoginLink: FormLinkConfig;
}

export class SignupForm extends BaseForm {
	protected override _config: ISignupFormConfig;

	constructor(config: ISignupFormConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): ISignupFormConfig {
		return this._config;
	}

	get form(): HTMLElement {
		const html = document.querySelector('.form') as HTMLElement;
		if (html) {
			return html;
		}
		throw new Error('form not found');
	}

	protected _prerender(): void {
		super._prerender();
		const toLoginLink = new FormLink(this._config.toLoginLink, this);
		this._items.toLoginLink = toLoginLink;
		this._templateContext = {
			...this._templateContext,
			toLoginLink: toLoginLink.render(),
		};
	}

	render(): string {
		this._prerender();
		return this._render('SignupForm.hbs');
	}
}
