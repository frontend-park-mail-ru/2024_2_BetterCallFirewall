import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import {
	ACTION_CHAT_TYPES,
	ActionChatRequest,
	ActionChatSendMessage,
	ActionEmojiPanelSwitch,
	ActionUpdateChat,
} from '../../actions/actionChat';
import { ACTION_MESSAGES_TYPES } from '../../actions/actionMessages';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileRequest,
} from '../../actions/actionProfile';
import app from '../../app';
import { Root } from '../../components';
import { Chat, ChatConfig } from '../../components/Chat/Chat';
import { PAGE_LINKS } from '../../config';
import dispatcher from '../../dispatcher/dispatcher';
import { MessageSend } from '../../models/message';
import { throttle } from '../../modules/throttle';
import { update } from '../../modules/vdom';
import { ChangeChat } from '../../stores/storeChat';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsChat = {
	chat?: Chat;
} & ComponentsHome;

export interface ViewChatConfig extends HomeConfig {
	chat: ChatConfig;
}

export class ViewChat extends ViewHome {
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
					this._companionProfileRequest();
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
			case ACTION_MESSAGES_TYPES.newMessage:
				this.updateViewChat(change.data);
				this._scrollOnNewMessage();
				break;
			case ACTION_CHAT_TYPES.updateChat:
				this.updateViewChat(change.data);
				break;
			case ACTION_CHAT_TYPES.switchEmojiPanel:
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
		this.updateViewHome(data);
		this._configChat = { ...this._configChat, ...data };
		this._render();
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderChat();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
		this._chat.textarea.focus();
	}

	protected _renderChat(): void {
		this._components.chat = new Chat(this._configChat.chat, this.content);
	}

	private _scrollToBottom(): void {
		this._chatScrollBottom = 0;
		this._scrollToOldPosition();
	}

	protected _addHandlers() {
		super._addHandlers();
		this._addBackButtonHandler();
		this._addSendButtonHandler();
		this._addEnterSendHandler();
		this._addCompanionLink();
		this._addScrollHandler();
		this._addEmojiHandlers();
		this._addEscapeHandler();
		this._chat.settingsButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
			},
		});
		this._root.addDocumentHandler({
			event: 'click',
			callback: (event) => {
				console.log(event);
				if (this._chat.config.showEmojiPanel) {
					this.sendAction(new ActionEmojiPanelSwitch(false));
				}
			},
		});
	}

	private _addBackButtonHandler() {
		this._chat.backButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this.sendAction(
					new ActionAppGoTo(this._configChat.chat.backButtonHref),
				);
			},
		});
	}

	private _addSendButtonHandler() {
		this._chat.formVNode.handlers.push({
			event: 'submit',
			callback: (event) => {
				event.preventDefault();
				this._sendMessage();
			},
		});
	}

	private _addEnterSendHandler() {
		this._chat.textareaVNode.handlers.push({
			event: 'keydown',
			callback: (event) => {
				const keyboardEvent = event as KeyboardEvent;
				if (keyboardEvent.key === 'Enter') {
					event.preventDefault();
					this._sendMessage();
				}
			},
		});
	}

	private _addCompanionLink() {
		this._chat.companionLinkVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this.sendAction(
					new ActionAppGoTo(`/${this._chat.config.companionId}`),
				);
			},
		});
	}

	private _addScrollHandler() {
		let debounceTimeout: NodeJS.Timeout;
		const handleScroll = () => {
			if (!this._handleScroll) {
				return;
			}
			const chatContent = this._chat.chatContentHTML;
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
		this._chat.chatContentVNode.handlers.push({
			event: 'scroll',
			callback: handleScroll,
		});
	}

	private _addEmojiHandlers(): void {
		this._chat.emojiBlockVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				const target = event.target as HTMLElement;
				if (target && target.textContent) {
					const emoji = target.textContent;
					const textarea = this._chat.textarea;
					textarea.value += emoji;
					textarea.focus();
				}
			},
		});

		this._chat.emojiOpenBtn.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this.sendAction(new ActionEmojiPanelSwitch(true));
			},
		});
	}

	private _addEscapeHandler() {
		this._root.addDocumentHandler({
			event: 'keydown',
			callback: (event) => {
				const keyEvent = event as KeyboardEvent;
				if (keyEvent.key === 'Escape') {
					this.sendAction(new ActionAppGoTo(PAGE_LINKS.messages));
				}
			},
		});
	}

	private _scrollOnNewMessage() {
		if (this._chatScrollBottom < 100) {
			this._scrollToBottom();
		}
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

	private _sendMessage() {
		const chatText = this._chat.text;
		if (!chatText) {
			return;
		}
		const message: MessageSend = {
			content: chatText,
			receiver: this._chat.config.companionId,
		};
		this._chat.textarea.value = '';
		this.sendAction(new ActionChatSendMessage(message));
	}

	private _companionProfileRequest = throttle(() => {
		this.sendAction(new ActionProfileRequest(`/${app.router.chatId}`));
	}, 1000);
}
