import { IBaseComponent } from '../BaseComponent';
import { BaseForm, IBaseForm, IBaseFormConfig } from '../BaseForm/BaseForm';

export interface IProfileEditFormConfig extends IBaseFormConfig {}

export interface IProfileEditForm extends IBaseForm {}

export class ProfileEditForm extends BaseForm implements IProfileEditForm {
	protected override _config: IProfileEditFormConfig;

	constructor(config: IProfileEditFormConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
	}

	get form(): HTMLElement {
		const html = this.htmlElement.querySelector('.form') as HTMLElement;
		if (html) {
			return html;
		}
		throw new Error('form not found');
	}

	get fileInput(): HTMLElement {
		const html = this.htmlElement.querySelector('input[type="file"]') as HTMLElement;
		if (!html) {
			throw new Error('input file not found');
		}
		return html;
	}

	get label(): HTMLElement {
		const html = this.htmlElement.querySelector('.form__upload') as HTMLElement;
		if (!html) {
			throw new Error('label not found');
		}
		return html;
	}

	get img(): HTMLElement {
		const html = this.htmlElement.querySelector('.form__img') as HTMLElement;
		if (!html) {
			throw new Error('label not found');
		}
		return html;
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = {
			...this._templateContext,
			className: 'edit-profile',
		};
	}

	render(): string {
		this._prerender();
		this._render('ProfileEditForm.hbs');
		return this.htmlElement.outerHTML;
	}

	update(data: IProfileEditFormConfig): void {
		this._config = { ...this._config, ...data };
		this.removeForUpdate();
		this.render();
	}
}
