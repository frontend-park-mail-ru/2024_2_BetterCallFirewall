import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IInputConfig extends IBaseComponentConfig {
	name?: string;
	placeholder?: string;
	text?: string;
	accept?: string;
	extra?: string;
	type: string;
}

export interface IInput extends IBaseComponent {}

/**
 * Class of input
 */
export class Input extends BaseComponent implements IInput {
	protected override _config: IInputConfig | null;

	/**
	 * Instance of Input
	 *
	 * @param {IInputConfig} config
	 * @param {IBaseComponent} parent
	 */
	constructor(config: IInputConfig, parent: IBaseComponent | null = null) {
		super(config, parent);
		this._config = config;
	}

	/**
	 * Rendering input with handlebars
	 *
	 * @returns {string} - generated HTML element of input
	 */
	render(show: boolean = true): string {
		this._prerender();
		return this._render('Input.hbs', show);
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = this.config;
	}

	protected _addHandlers(): void {
        const fileInput = this.htmlElement.querySelector('input[type="file"]') as HTMLElement;
        if (fileInput) {
			this.addHandler(fileInput, 'change', (event) => {
				const input = event.target as HTMLInputElement;
                const label = this.htmlElement.querySelector('.form__upload');
                
                if (input.files && input.files.length > 0) {
					if (label) {
						label.classList.add('active');
						label.textContent = 'Картинка выбрана';
					}
                } else {
                    label?.classList.remove('active');
                }
			});
        }
    }
}

Handlebars.registerHelper('eq', function (arg1, arg2) {
    return arg1 === arg2;
});