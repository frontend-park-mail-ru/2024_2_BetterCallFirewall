import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface ITextAreaConfig extends IBaseComponentConfig {
	name: string;
	header: string;
	text: string;
	type: string;
	validator?: (name: HTMLTextAreaElement) => string;
}

export interface ITextArea extends IBaseComponent {}

/**
 * Class of textarea
 */
export class TextArea extends BaseComponent implements ITextArea {
	protected override _config: ITextAreaConfig | null;

	constructor(config: ITextAreaConfig, parent: IBaseComponent | null = null) {
		super(config, parent);
		this._config = config;
	}

	render(show: boolean = true): string {
		this._prerender();
		const result = this._render('TextArea.hbs', show);
		return result;
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = this.config;
	}
}
