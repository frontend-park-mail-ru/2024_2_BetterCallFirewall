import { ACTION_APP_TYPES } from '../../actions/actionApp';
import {
	ACTION_CHAT_TYPES,
	ActionChatRequest,
	ActionChatSendMessage,
	ActionUpdateChat,
} from '../../actions/actionChat';
import { ActionMenuLinkClick } from '../../actions/actionMenu';
import { ACTION_MESSAGES_TYPES } from '../../actions/actionMessages';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileRequest,
} from '../../actions/actionProfile';
import app from '../../app';
import { Root } from '../../components';
import { Chat, IChatConfig } from '../../components/Chat/Chat';
import { IChatMessageConfig } from '../../components/ChatMessage/ChatMessage';
import { PAGE_LINKS } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import { MessageSend } from '../../models/message';
import { ChangeChat } from '../../stores/storeChat';
import {
	ComponentsHome,
	HomeConfig,
	IViewHome,
	ViewHome,
} from '../home/viewHome';

export type ComponentsChat = {
	chat?: Chat;
} & ComponentsHome;

export interface ViewChatConfig extends HomeConfig {
	chat: IChatConfig;
}

export interface IViewChat extends IViewHome {
	handleChange(change: ChangeChat): void;
}

export class ViewChat extends ViewHome implements IViewChat {
	protected _configChat: ViewChatConfig;
	protected _components: ComponentsChat = {};
	private _chatScrollBottom: number = 0;
	private _handleScroll: boolean = true;

	constructor(config: ViewChatConfig, root: Root) {
		super(config, root);
		this._configChat = config;
	}

	get config(): ViewChatConfig {
		return this._configChat;
	}

	handleChange(change: ChangeChat): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_PROFILE_TYPES.profileRequestSuccess:
				this.updateViewChat(change.data);
				this.sendAction(
					new ActionChatRequest(this._configChat.chat.companionId),
				);
				break;
			case ACTION_APP_TYPES.actionAppInit:
			case ACTION_CHAT_TYPES.goToChat: {
				this._configChat = Object.assign(this._configChat, change.data);
				this.render();
				if (app.router.chatId) {
					this.sendAction(
						new ActionProfileRequest(`/${app.router.chatId}`),
					);
				}
				this._chatScrollBottom = 0;
				break;
			}
			case ACTION_CHAT_TYPES.requestChatSuccess:
				this.updateViewChat(change.data);
				this._scrollToOldPosition();
				break;
			case ACTION_CHAT_TYPES.sendMessage:
				this.updateViewChat(change.data);
				this._scrollToBottom();
				break;
			case ACTION_MESSAGES_TYPES.newMessage: {
				const messages = change.data.chat.messages;
				this.addNewMessage(messages[messages.length - 1]);
				// this.updateViewChat(change.data);
				// this._scrollToOldPosition();
				break;
			}
			case ACTION_CHAT_TYPES.updateChat:
				this.updateViewChat(change.data);
				break;
		}
	}

	render(): void {
		this._render();
		dispatcher.getAction(new ActionUpdateChat());
		this._scrollToBottom();
	}

	updateViewChat(data: ViewChatConfig): void {
		this._configChat = { ...this._configChat, ...data };
		this._render();
	}

	update(config: object): void {
		this.updateViewChat(config as ViewChatConfig);
	}

	addNewMessage(messageConfig?: IChatMessageConfig) {
		this._chat.addMessage(messageConfig);
		if (this._chatScrollBottom < 100) {
			this._scrollToBottom();
		}
	}

	protected _render(): void {
		super._render();
		this._renderChat();
		this._addHandlers();
	}

	protected _renderChat(): void {
		const content = this.content;
		const chat = new Chat(this._configChat.chat, content);
		chat.render();
		this._components.chat = chat;
		chat.textarea.focus();
	}

	private _scrollToBottom(): void {
		this._chatScrollBottom = 0;
		this._scrollToOldPosition();
	}

	private _addHandlers() {
		this._addBackButtonHandler();
		this._addSendButtonHandler();
		this._addEnterSendHandler();
		this._addCompanionLink();
		this._addScrollHandler();
		this._addEscapeHandler();
		this._chat.addHandler(this._chat.settingsButton, 'click', (event) =>
			event.preventDefault(),
		);
	}

	private _addBackButtonHandler() {
		const backButtonHTML = this._chat.backButtonHTML;
		this._chat.addHandler(backButtonHTML, 'click', (event) => {
			event.preventDefault();
			this.sendAction(
				new ActionMenuLinkClick({
					href: this._configChat.chat.backButtonHref,
				}),
			);
		});
	}

	private _addSendButtonHandler() {
		const form = this._chat.form;
		this._chat.addHandler(form, 'submit', (event) => {
			event.preventDefault();
			const chatText = this._chat.text;
			if (!chatText) {
				return;
			}
			const message: MessageSend = {
				content: chatText,
				receiver: this._chat.config.companionId,
			};
			this.sendAction(new ActionChatSendMessage(message));
		});
	}

	private _addEnterSendHandler() {
		this._chat.addHandler(this._chat.textarea, 'keydown', (event) => {
			const keyboardEvent = event as KeyboardEvent;
			if (keyboardEvent.key === 'Enter') {
				event.preventDefault();
				const chatText = this._chat.text;
				if (!chatText) {
					return;
				}
				const message: MessageSend = {
					content: chatText,
					receiver: this._chat.config.companionId,
				};
				this.sendAction(new ActionChatSendMessage(message));
			}
		});
	}

	private _addCompanionLink() {
		const chat = this._components.chat;
		const companionLink = chat?.htmlElement?.querySelector(
			'.chat__companion',
		) as HTMLElement;
		const companionId = this._components.chat?.config.companionId;
		if (chat && companionId && companionLink) {
			chat.addHandler(companionLink, 'click', (event) => {
				event.preventDefault();
				this.sendAction(
					new ActionMenuLinkClick({ href: `/${companionId}` }),
				);
			});
		}
	}

	private _addScrollHandler() {
		const chatContent = this._chat.chatContentHTML;
		const content = this.content;

		let debounceTimeout: NodeJS.Timeout;

		const handleScroll = () => {
			if (!this._handleScroll) {
				return;
			}
			this._chatScrollBottom =
				chatContent.scrollHeight -
				chatContent.scrollTop -
				chatContent.clientHeight;
			clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(() => {
				if (chatContent.scrollTop < chatContent.clientHeight * 2) {
					this.sendAction(
						new ActionChatRequest(
							this._chat.config.companionId,
							this._chat.config.messages[0].createdAtISO,
						),
					);
				}
			}, 200);
		};

		content.addHandler(chatContent, 'scroll', handleScroll);
	}

	private _addEscapeHandler() {
		this.content.addHandler(document, 'keydown', (event) => {
			const keyEvent = event as KeyboardEvent;
			console.log('key:', keyEvent.key);
			if (keyEvent.key === 'Escape') {
				this.sendAction(
					new ActionMenuLinkClick({ href: PAGE_LINKS.messages }),
				);
			}
		});
	}

	private _scrollToOldPosition() {
		const chatContent = this._chat.chatContentHTML;
		this._handleScroll = false;
		chatContent.scrollTop =
			chatContent.scrollHeight - this._chatScrollBottom;
		this._handleScroll = true;
	}

	private get _chat(): Chat {
		const chat = this._components.chat;
		if (!chat) {
			throw new Error('chat does not exist');
		}
		return chat;
	}
}
