import { findVNodeByClass, findVNodeByKey, VNode } from '../../modules/vdom';
import { BaseForm, BaseFormConfig } from '../BaseForm/BaseForm';
import Component from '../Component';
import { FormLink, FormLinkConfig } from '../FormLink/FormLink';
import { InputConfig } from '../Input/Input';

export interface SignupFormConfig extends BaseFormConfig {
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
	protected override _config: SignupFormConfig;

	constructor(config: SignupFormConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get config(): SignupFormConfig {
		return this._config;
	}

	get form(): HTMLElement {
		const html = document.querySelector('.form') as HTMLElement;
		if (html) {
			return html;
		}
		throw new Error('form not found');
	}

	get toLoginLinkVNode(): VNode {
		const vnode = findVNodeByKey(this.vnode, this._config.toLoginLink.key);
		if (!vnode) {
			throw new Error('toLoginLink vnode not found');
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
