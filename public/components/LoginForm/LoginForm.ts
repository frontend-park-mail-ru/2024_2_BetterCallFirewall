// import { IBaseComponent } from '../BaseComponent';
// import { BaseForm, IBaseForm, IBaseFormConfig } from '../BaseForm/BaseForm';
// import { FormLink, IFormLinkConfig } from '../FormLink/FormLink';
// import { IInputConfig } from '../Input/Input';

// export interface ILoginFormConfig extends IBaseFormConfig {
// 	inputs: {
// 		email: IInputConfig;
// 		password: IInputConfig;
// 	};
// 	toSignupLink: IFormLinkConfig;
// }

// export class LoginForm extends BaseForm {
// 	protected override _config: ILoginFormConfig;

// 	constructor(config: ILoginFormConfig, parent: IBaseComponent) {
// 		super(config, parent);
// 		this._config = config;
// 	}

// 	get config(): ILoginFormConfig {
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
// 		const toSignupLink = new FormLink(this._config?.toSignupLink, this);
// 		this._items.toSignupLink = toSignupLink;
// 		this._templateContext = {
// 			...this._templateContext,
// 			toSignupLink: toSignupLink.render(false),
// 		};
// 	}

// 	render(): string {
// 		this._prerender();
// 		this._render('LoginForm.hbs');

// 		const toSignupLinkHTML = this.htmlElement.querySelector(
// 			`[data-key=${this._config.toSignupLink.key}]`,
// 		);
// 		if (!toSignupLinkHTML) {
// 			throw new Error('toSignupLinkHTML not found');
// 		}
// 		this.items.toSignupLink.htmlElement = toSignupLinkHTML as HTMLElement;

// 		return this.htmlElement.outerHTML;
// 	}
// }

import { findVNodeByClass, VNode } from '../../modules/vdom';
import { BaseForm, BaseFormConfig } from '../BaseForm/BaseForm';
import Component from '../Component';
import { FormLink, FormLinkConfig } from '../FormLink/FormLink';
import { InputConfig } from '../Input/Input';

export interface ILoginFormConfig extends BaseFormConfig {
	inputs: {
		email: InputConfig;
		password: InputConfig;
	};
	toSignupLink: FormLinkConfig;
}

export class LoginForm extends BaseForm {
	protected override _config: ILoginFormConfig;

	constructor(config: ILoginFormConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): ILoginFormConfig {
		return this._config;
	}

	get form(): HTMLElement {
		const html = document.querySelector('.form') as HTMLElement;
		if (html) {
			return html;
		}
		throw new Error('form not found');
	}

	get formVNode(): VNode {
		const vnode = findVNodeByClass(this.vnode, 'form');
		if (!vnode) {
			throw new Error('form vnode not found');
		}
		return vnode;
	}

	protected _prerender(): void {
		super._prerender();
		const toSignupLink = new FormLink(this._config?.toSignupLink, this);
		this._items.toSignupLink = toSignupLink;
		this._templateContext = {
			...this._templateContext,
			toSignupLink: toSignupLink.render(),
		};
	}

	render(): string {
		this._prerender();
		return this._render('LoginForm.hbs');
	}
}
