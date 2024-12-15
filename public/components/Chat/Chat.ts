import { VNode } from '../../modules/vdom';
import { AttachmentsInputConfig } from '../AttachmentsInput/AttachmentsInput';
import { ChatAttachmentInput } from '../ChatAttachmentInput/ChatAttachmentInput';
import { ChatMessage, ChatMessageConfig } from '../ChatMessage/ChatMessage';
import Component, { ComponentConfig } from '../Component';

export interface ChatConfig extends ComponentConfig {
	companionId: number;
	companionAvatar: string;
	companionName: string;
	lastDateOnline: string;
	backButtonHref: string;
	messages: ChatMessageConfig[];
	myId: number;
	myName: string;
	myAvatar: string;
	inputText: string;
	inputKey: string;
	showEmojiPanel: boolean;
	attachmentInput: AttachmentsInputConfig;
}

export class Chat extends Component {
	protected _config: ChatConfig;
	private _messages: ChatMessage[] = [];
	private _attachmentInput: ChatAttachmentInput;

	/**
	 * Instance of chat
	 *
	 * @param {ChatConfig} config - post data
	 * @param {Component} parent - parent element
	 */
	constructor(config: ChatConfig, parent: Component) {
		super(config, parent);
		this._config = config;

		this._attachmentInput = new ChatAttachmentInput(
			this._config.attachmentInput,
			this,
		);
	}

	get config(): ChatConfig {
		return this._config;
	}

	get backButtonVNode(): VNode {
		return this._findVNodeByClass('chat__back-button');
	}

	get companionLinkVNode(): VNode {
		return this._findVNodeByClass('chat__companion');
	}

	get chatContentHTML(): HTMLElement {
		const html = document.querySelector('.chat__content') as HTMLElement;
		if (!html) {
			throw new Error('chatContent not found');
		}
		return html;
	}

	get chatContentVNode(): VNode {
		return this._findVNodeByClass('chat__content');
	}

	get emojiVNode(): VNode {
		return this._findVNodeByClass('emoji-button');
	}

	get emojiOpenBtn(): VNode {
		return this._findVNodeByKey('emoji-btn');
	}

	get settingsButtonVNode(): VNode {
		return this._findVNodeByClass('chat__settings-button');
	}

	get formVNode(): VNode {
		return this._findVNodeByKey('form');
	}

	get textarea(): HTMLTextAreaElement {
		const html = document.querySelector(
			`[data-key=${this._config.inputKey}]`,
		) as HTMLTextAreaElement;
		if (!html) {
			throw new Error('textarea not found');
		}
		return html;
	}

	get textareaVNode(): VNode {
		return this._findVNodeByKey(this._config.inputKey);
	}

	get text(): string {
		const textarea = this.textarea as HTMLTextAreaElement;
		return textarea.value ? textarea.value.trim() : '';
	}

	get messages(): ChatMessage[] {
		return this._messages;
	}

	get attachButtonVNode(): VNode {
		return this._findVNodeByClass('chat__attach-button');
	}

	get attachmentInput(): ChatAttachmentInput {
		return this._attachmentInput;
	}

	render(): string {
		this._prerender();
		return this._render('Chat.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._messages = this._config.messages.map((config) => {
			return new ChatMessage(config, this);
		});
		this._attachmentInput = new ChatAttachmentInput(
			this._config.attachmentInput,
			this,
		);
		this._templateContext = {
			...this._templateContext,
			messages: this._messages.map((message) => {
				return message.render();
			}),
			attachmentInput: this._attachmentInput.render(),
		};
	}

	protected _addHandlers(): void {
		super._addHandlers();
		this.attachButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				(
					this._attachmentInput.inputVNode.element as HTMLInputElement
				).click();
			},
		});
	}
}
