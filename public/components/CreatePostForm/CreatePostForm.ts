import BaseComponent, { IBaseComponent, IBaseComponentConfig } from '../BaseComponent';

export interface ICreatePostFormConfig extends IBaseComponentConfig {
    placeholder?: string;
}

export class CreatePostForm extends BaseComponent {
    protected _config: ICreatePostFormConfig | null;
    // private _form: HTMLFormElement;

    constructor(config: ICreatePostFormConfig, parent: IBaseComponent) {
        super(config, parent);
        this._config = config;
    }

    // get form(): HTMLFormElement {
    //     return this._form;
    // }

    render(show: boolean = true): string {
        this._prerender();
        return this._render('CreatePostForm.hbs', show);
    }

    protected _prerender(): void {
        super._prerender();
        this._templateContext = { ...this.config };
    }
}