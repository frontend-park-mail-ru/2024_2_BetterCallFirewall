import { VNode } from '../../modules/vdom';
import {
	AttachmentsInput,
	AttachmentsInputConfig,
} from '../AttachmentsInput/AttachmentsInput';
import { BaseForm, BaseFormConfig } from '../BaseForm/BaseForm';
import { Component } from '../Component';

export interface CreatePostFormConfig extends BaseFormConfig {
	attachmentsInput: AttachmentsInputConfig;
}

export class CreatePostForm extends BaseForm {
	protected override _config: CreatePostFormConfig;

	constructor(config: CreatePostFormConfig, parent: Component) {
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

	get submitButton(): HTMLElement {
		const html = document.querySelector('.form__button') as HTMLElement;
		if (!html) {
			throw new Error('submit button not found');
		}
		return html;
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

	get filesInputVNode(): VNode {
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
			className: 'send-post',
			attachmentsInput: attachmentsInput.render(),
		};
	}

	render(): string {
		this._prerender();
		return this._render('CreatePostForm.hbs');
	}

	/**
	 * Printing error above submit button
	 * @param {string} error
	 */
	printError(error: string) {
		if (error) {
			const messageElement = document.querySelector('.form__error');
			if (!messageElement) {
				throw new Error('message element not found');
			}
			messageElement.textContent = error;
		}
	}

	/**
	 * Clear error above submit button
	 */
	clearError() {
		const messageElement = document.querySelector('.form__error');
		if (!messageElement) {
			throw new Error('message element not found');
		}
		messageElement.textContent = '';
	}
}
