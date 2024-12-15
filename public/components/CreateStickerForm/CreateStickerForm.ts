import { BaseForm, BaseFormConfig } from '../BaseForm/BaseForm';
import Component from '../Component';

export interface ICreateStickerFormConfig extends BaseFormConfig {}

export class CreateStickerForm extends BaseForm {
	protected override _config: ICreateStickerFormConfig;

	constructor(config: ICreateStickerFormConfig, parent: Component) {
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
		};
	}

	render(): string {
		this._prerender();
		return this._render('CreateStickerForm.hbs');
	}
}