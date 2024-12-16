import { findVNodeByClass, findVNodeByKey, VNode } from '../../modules/vdom';
import { BaseForm, BaseFormConfig } from '../BaseForm/BaseForm';
import { Component } from '../Component';
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

	get toSingupLinkVNode(): VNode {
		const vnode = findVNodeByKey(this.vnode, this._config.toSignupLink.key);
		if (!vnode) {
			throw new Error('toSignupLink vnode not found');
		}
		return vnode;
	}

	get titleLinkVNode(): VNode {
		const vnode = findVNodeByClass(this.vnode, 'title');
		if (!vnode) {
			throw new Error('titleLink vnode not found');
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
