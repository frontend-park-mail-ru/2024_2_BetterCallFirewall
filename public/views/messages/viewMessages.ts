import { ActionChatGoToChat } from '../../actions/actionChat';
import { ActionMessagesRequest } from '../../actions/actionMessages';
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
		console.log('ViewMessages:', change);
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
		super._render();
		this._renderMessages();
		this._printMessage();
	}

	protected _renderMessages(): void {
		const content = this.content;
		this._configMessages.messages.forEach((messageConfig) => {
			const message = new Message(messageConfig, content);
			message.render();
			this._addMessageHandlers(message);
		});
	}

	protected _addMessageHandlers(message: Message): void {
		message.addHandler(message.htmlElement, 'click', (event) => {
			event.preventDefault();
			const config = message.config;
			this.sendAction(
				new ActionChatGoToChat({
					chatConfig: {
						key: `chat-${config.authorId}`,
						companionId: config.authorId,
						companionAvatar: config.avatar,
						companionName: config.name,
						lastDateOnline: '-1',
						backButtonHref: PAGE_LINKS.messages,
						messages: [],
						myId: this._configMessages.main.header.profile.id,
						myName: this._configMessages.main.header.profile.name,
						myAvatar:
							this._configMessages.main.header.profile.avatar,
					},
				}),
			);
		});
	}
}
