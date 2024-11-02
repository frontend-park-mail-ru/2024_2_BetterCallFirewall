import { IBaseComponent, IBaseComponentConfig } from '../BaseComponent';
import { BaseForm, IBaseForm, IBaseFormConfig } from '../BaseForm/BaseForm';

export interface ICreatePostFormConfig extends IBaseFormConfig, IBaseComponentConfig {
    key: string;
}

export interface ICreatePostForm extends IBaseForm {}

export class CreatePostForm extends BaseForm implements ICreatePostForm {
    protected override _config: ICreatePostFormConfig;

    constructor(config: ICreatePostFormConfig, parent: IBaseComponent) {
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
            className: 'send-post'
        };
    }

    render(): string {
        this._prerender();
        this._render('CreatePostForm.hbs');
        return this.htmlElement.outerHTML;
    }

    update(data: ICreatePostFormConfig): void {
        this._config = { ...this._config, ...data };
        this.removeForUpdate();
        this.render();
    }
}