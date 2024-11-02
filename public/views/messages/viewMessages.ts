import { ActionGoToChat } from '../../actions/actionChat';
import { ActionUpdateMessages } from '../../actions/actionMessages';
import { Content, Root } from '../../components';
import { IMessagesConfig, Message } from '../../components/Message/Message';
import dispatcher from '../../dispatcher/dispatcher';
import { ChangeMessages } from '../../stores/storeMessages';
import {
	ComponentsHome,
	HomeConfig,
	IViewHome,
	ViewHome,
} from '../home/viewHome';

export type ComponentsMessages = {
	messages?: Message;
} & ComponentsHome;

export interface ViewMessagesConfig extends HomeConfig {
	messages: IMessagesConfig;
}

export interface IViewMessages extends IViewHome {
	handleChange(change: ChangeMessages): void;
}

export class ViewMessages extends ViewHome implements IViewHome {
	protected _configMessages: ViewMessagesConfig;
	protected _components: ComponentsMessages = {};

	constructor(config: ViewMessagesConfig, root: Root) {
		super(config, root);
		this._configMessages = config;
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
		dispatcher.getAction(
			new ActionUpdateMessages(this._configMessages.messages),
		);
	}

	updateViewMessages(data: ViewMessagesConfig): void {
		this._configMessages = data;
		this._render();
	}

	protected _render(): void {
		super._render();
		this._renderMessages();
	}

	protected _renderMessages(): void {
		this._configMessages.messages = {
			key: 'message',
			avatar: '../../img/avatar.png',
			name: 'Asap Rocky',
			lastMessage: 'Lets do it.',
			date: '12:34',
			unreadedCount: 3,
		}; // tmp

		const content = this._components.content;
		if (!content) {
			throw new Error('content does no exist on ViewMessages');
		}
		const messages = new Content(
			{
				...this._configMessages.messages,
				className: 'messages',
			},
			content,
		);
		messages.render();
		this._components.content = messages;

		// Тестовые сообщения
		for (let i = 0; i < 10; i++) {
			const message = new Message(
				{
					key: 'message',
					avatar: '../../img/avatar.png',
					name: 'Asap Rocky',
					lastMessage: 'Lets do it.',
					date: '12:34',
					unreadedCount: 3,
				},
				this._components.content,
			);
			messages.addChild(message);
			message.render();
			this._addMessageHandlers(message);
		}
	}

	protected _addMessageHandlers(message: Message): void {
		message.htmlElement.addEventListener('click', () => {
			dispatcher.getAction(
				new ActionGoToChat({
					href: '/chat',
				}),
			);
		});
	}
}
