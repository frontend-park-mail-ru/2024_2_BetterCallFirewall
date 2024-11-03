import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';

export interface IChatConfig extends IBaseComponentConfig {
	userId: number;
	companionAvatar: string;
	companionName: string;
	lastDateOnline: string;
	backButtonHref: string;
}

export interface IChat extends BaseComponent {}

export class Chat extends BaseComponent implements IChat {
	protected _config: IChatConfig | null;

	/**
	 * Instance of chat
	 *
	 * @param {IChatConfig} config - post data
	 * @param {IBaseComponent} parent - parent element
	 */
	constructor(config: IChatConfig, parent: IBaseComponent) {
		super(config, parent);
		this._config = config;
	}

	get backButtonHTML(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'a.chat__back-button',
		) as HTMLElement;
		if (!html) {
			throw new Error('back button not found');
		}
		return html;
	}

	render(show: boolean = true): string {
		this._prerender();
		return this._render('Chat.hbs', show);
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this.config };
	}
}
