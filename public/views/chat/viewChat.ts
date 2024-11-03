import { ACTION_CHAT_TYPES, ActionUpdateChat } from '../../actions/actionChat';
import { ActionMenuLinkClick } from '../../actions/actionMenu';
import { Root } from '../../components';
import { Chat, IChatConfig } from '../../components/Chat/Chat';
import dispatcher from '../../dispatcher/dispatcher';
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
		super.handleChange(change);
		switch (change.type) {
			case ACTION_CHAT_TYPES.goToChat:
				this.render();
				break;
			case ACTION_CHAT_TYPES.updateChat:
				this.updateViewChat(change.data);
				break;
		}
	}

	render(): void {
		this._render();
		dispatcher.getAction(new ActionUpdateChat());
		this._addHandlers();
	}

	updateViewChat(data: ViewChatConfig): void {
		this._configChat = { ...this._configChat, ...data };
		this._render();
	}

	protected _render(): void {
		super._render();
		this._renderChat();
	}

	protected _renderChat(): void {
		this._configChat.chat = {
			...this._configChat.chat,
			...{
				key: 'chat',
				companionAvatar: '../../img/avatar.png',
				companionName: 'Asap Rocky',
				lastDateOnline: '18:00',
			},
		}; // tmp

		const content = this.content;
		const chat = new Chat(this._configChat.chat, content);
		chat.render();
		this._components.chat = chat;
	}

	private _addHandlers() {
		this._addBackButtonHandler();
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

	private get _chat(): Chat {
		const chat = this._components.chat;
		if (!chat) {
			throw new Error('chat does not exist');
		}
		return chat;
	}
}
