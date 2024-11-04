import { IBaseComponent } from '../BaseComponent';
import { BaseForm, IBaseForm, IBaseFormConfig } from '../BaseForm/BaseForm';

export interface IPostEditFormConfig extends IBaseFormConfig {
}

export interface IPostEditForm extends IBaseForm {}

export class PostEditForm extends BaseForm implements IPostEditForm {
    protected override _config: IPostEditFormConfig;

    constructor(config: IPostEditFormConfig, parent: IBaseComponent) {
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

    protected _prerender(): void {
        super._prerender();
        this._templateContext = {
            ...this._templateContext,
            className: 'edit-post'
        };
    }

    render(): string {
        this._prerender();
        this._render('PostEditForm.hbs');
        return this.htmlElement.outerHTML;
    }

    update(data: IPostEditFormConfig): void {
        this._config = { ...this._config, ...data };
        this.removeForUpdate();
        this.render();
    }
}