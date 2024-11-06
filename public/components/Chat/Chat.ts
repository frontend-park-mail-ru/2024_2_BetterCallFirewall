import BaseComponent, {
	IBaseComponent,
	IBaseComponentConfig,
} from '../BaseComponent';
import { ChatMessage, IChatMessageConfig } from '../ChatMessage/ChatMessage';

export interface IChatConfig extends IBaseComponentConfig {
	companionId: number;
	companionAvatar: string;
	companionName: string;
	lastDateOnline: string;
	backButtonHref: string;
	messages: IChatMessageConfig[];
	myId: number;
	myName: string;
	myAvatar: string;
}

export interface IChat extends BaseComponent {}

export class Chat extends BaseComponent implements IChat {
	protected _config: IChatConfig;
	private _messages: ChatMessage[] = [];

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

	get config(): IChatConfig {
		return this._config;
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

	get chatContentHTML(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'.chat__content',
		) as HTMLElement;
		if (!html) {
			throw new Error('chatContent not found');
		}
		return html;
	}

	get settingsButton(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'.chat__settings-button',
		) as HTMLElement;
		if (!html) {
			throw new Error('settingsButton not found');
		}
		return html;
	}

	get form(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'form.sender',
		) as HTMLElement;
		if (!html) {
			throw new Error('form not found');
		}
		return html;
	}

	get textarea(): HTMLElement {
		const html = this.htmlElement.querySelector(
			'.sender__input',
		) as HTMLElement;
		if (!html) {
			throw new Error('textarea not found');
		}
		return html;
	}

	get text(): string {
		const textarea = this.form.querySelector('textarea');
		if (!textarea) {
			throw new Error('textarea not found');
		}
		return textarea.value ? textarea.value.trim() : '';
	}

	render(show: boolean = true): string {
		this._prerender();
		this._render('Chat.hbs', show);
		const chatContent = this.chatContentHTML;
		const messages = this._config?.messages.map((config) => {
			const message = new ChatMessage(config, this);
			message.render(false);
			message.appendToHTML(chatContent);
			return message;
		});
		if (messages) {
			this._messages = messages;
		}
		return this.htmlElement.outerHTML;
	}

	protected _prerender(): void {
		super._prerender();
		this._templateContext = { ...this.config };
	}
}
