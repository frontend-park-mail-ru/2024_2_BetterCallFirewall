import { ActionChatGoToChat } from '../../actions/actionChat';
import { ActionMessagesRequest } from '../../actions/actionMessages';
import { Root } from '../../components';
import { MessageConfig, Message } from '../../components/Message/Message';
import { PAGE_URLS } from '../../config';
import { update } from '../../modules/vdom';
import { ChangeMessages } from '../../stores/storeMessages';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsMessages = {
	messages?: Message[];
} & ComponentsHome;

export interface ViewMessagesConfig extends HomeConfig {
	messages: MessageConfig[];
}

export class ViewMessages extends ViewHome {
	protected _configMessages: ViewMessagesConfig;
	protected _components: ComponentsMessages = {};

	constructor(config: ViewMessagesConfig, root: Root) {
		super(config, root);
		this._configMessages = config;
	}

	get config(): ViewMessagesConfig {
		return this._configMessages;
	}

	handleChange(change: ChangeMessages): void {
		super.handleChange(change);
		switch (change.type) {
			default:
				this.updateViewMessages(change.data);
		}
	}

	render(): void {
		this._render();
		this.sendAction(new ActionMessagesRequest());
	}

	updateViewMessages(data: ViewMessagesConfig): void {
		this.updateViewHome(data);
		this._configMessages = Object.assign(this._configMessages, data);
		this._render();
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderMessages();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	protected _renderMessages(): void {
		this._components.messages = this._configMessages.messages.map(
			(config) => {
				return new Message(config, this.content);
			},
		);
	}

	protected _addHandlers(): void {
		super._addHandlers();
		this._components.messages?.forEach((message) => {
			this._addMessageHandlers(message);
		});
	}

	protected _addMessageHandlers(message: Message): void {
		message.vnode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				this.sendAction(
					new ActionChatGoToChat({
						href: PAGE_URLS.chat + `/${message.config.authorId}`,
					}),
				);
			},
		});
	}
}
