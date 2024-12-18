import { VNode } from '../../modules/vdom';
import {
	AttachmentsInput,
	AttachmentsInputConfig,
} from '../AttachmentsInput/AttachmentsInput';
import { BaseForm, BaseFormConfig } from '../BaseForm/BaseForm';
import { Component } from '../Component';

export interface PostEditFormConfig extends BaseFormConfig {
	attachmentsInput: AttachmentsInputConfig;
}

export class PostEditForm extends BaseForm {
	protected override _config: PostEditFormConfig;

	constructor(config: PostEditFormConfig, parent: Component) {
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
		return this._findVNodeByKey(this._config.attachmentsInput.key);
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
		const attachmentsInput = new AttachmentsInput(
			this._config.attachmentsInput,
			this,
		);
		this._templateContext = {
			...this._templateContext,
			className: 'edit-post',
			attachmentsInput: attachmentsInput.render(),
		};
	}

	render(): string {
		this._prerender();
		return this._render('PostEditForm.hbs');
	}
}
