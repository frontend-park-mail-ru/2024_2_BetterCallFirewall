import { ActionChatGoToChat } from '../../actions/actionChat';
import { Root } from '../../components';
import { IMessageConfig, Message } from '../../components/Message/Message';
import { PAGE_LINKS } from '../../config';
import { ChangeMessages } from '../../stores/storeMessages';
import {
	ComponentsHome,
	HomeConfig,
	IViewHome,
	ViewHome,
} from '../home/viewHome';

export type ComponentsMessages = {
	messages?: Message[];
} & ComponentsHome;

export interface ViewMessagesConfig extends HomeConfig {
	messages: IMessageConfig[];
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
	}

	render(): void {
		this._render();
		// dispatcher.getAction(
		// 	new ActionUpdateMessages(this._configMessages.messages),
		// );
	}

	updateViewMessages(data: ViewMessagesConfig): void {
		this.updateViewHome(data);
		this._configMessages = data;
		this._render();
	}

	protected _render(): void {
		super._render();
		this._renderMessages();
	}

	protected _renderMessages(): void {
		// this._configMessages.messages = {
		// 	authorId: 0,
		// 	key: 'message',
		// 	avatar: '../../img/avatar.png',
		// 	name: 'Asap Rocky',
		// 	lastMessage: 'Lets do it.',
		// 	date: '12:34',
		// 	unreadedCount: 3,
		// }; // tmp

		const content = this.content;

		// Тестовые сообщения
		for (let i = 0; i < 10; i++) {
			const message = new Message(
				{
					authorId: 0,
					key: 'message',
					avatar: '../../img/avatar.png',
					name: 'Asap Rocky',
					lastMessage: 'Lets do it.',
					date: '12:34',
					unreadedCount: 3,
					href: PAGE_LINKS.chat,
				},
				content,
			);
			message.render();
			this._addMessageHandlers(message);
		}
	}

	protected _addMessageHandlers(message: Message): void {
		message.addHandler(message.htmlElement, 'click', (event) => {
			event.preventDefault();
			this.sendAction(
				new ActionChatGoToChat({ userId: message.authorId }),
			);
			// this.sendAction(new ActionMenuLinkClick({ href: message.href }));
		});
	}
}
