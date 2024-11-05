import {
	ACTION_CHAT_TYPES,
	ActionChatRequest,
	ActionChatSendMessage,
	ActionUpdateChat,
} from '../../actions/actionChat';
import { ActionMenuLinkClick } from '../../actions/actionMenu';
import { ACTION_MESSAGES_TYPES } from '../../actions/actionMessages';
import { Root } from '../../components';
import { Chat, IChatConfig } from '../../components/Chat/Chat';
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

	constructor(config: ViewChatConfig, root: Root) {
		super(config, root);
		this._configChat = config;
	}

	handleChange(change: ChangeChat): void {
		console.log('ViewChat:', change);
		super.handleChange(change);
		switch (change.type) {
			case ACTION_CHAT_TYPES.goToChat:
				this.render();
				this.sendAction(
					new ActionChatRequest(this._configChat.chat.companionId),
				);
				break;
			case ACTION_CHAT_TYPES.sendMessage:
			case ACTION_MESSAGES_TYPES.newMessage:
			case ACTION_CHAT_TYPES.requestChatSuccess:
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
	}

	private _scrollToBottom(): void {
		const chatContainer = this._chat.chatContentHTML;
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}

	private _addHandlers() {
		this._addBackButtonHandler();
		this._addSendButtonHandler();
		this._addEnterSendHandler();
		this._addCompanionLink();
		this._addScrollHandler();
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
			console.log('submit');
			event.preventDefault();
			const message: MessageSend = {
				content: this._chat.text,
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
				const message: MessageSend = {
					content: this._chat.text,
					receiver: this._chat.config.companionId,
				};
				this.sendAction(new ActionChatSendMessage(message));
			}
		});
	}

	private _addCompanionLink() {
		const chat = this._components.chat;
		const companionLink = chat?.htmlElement?.querySelector('.chat__companion') as HTMLElement;
		const companionId = this._components.chat?.config.companionId;
		if (chat && companionId && companionLink) {
			chat.addHandler(companionLink, 'click', (event) => {
				event.preventDefault();
				this.sendAction(
					new ActionMenuLinkClick({ href: `/${companionId}` })
				);
			});
		}

	}

	private _addScrollHandler() {
		const chatContent = this._chat.chatContentHTML;
		const content = this.content;

		let debounceTimeout: NodeJS.Timeout;

		const handleScroll = () => {
			clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(() => {
				if (
					chatContent.scrollTop + chatContent.clientHeight >=
					chatContent.scrollHeight
				) {
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

	private get _chat(): Chat {
		const chat = this._components.chat;
		if (!chat) {
			throw new Error('chat does not exist');
		}
		return chat;
	}
}
