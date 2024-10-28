import { Content, Root } from '../../components';
import { IBaseComponent } from '../../components/BaseComponent';
import { Message } from '../../components/Message/Message';
import { HomeConfig, ViewHome } from '../home/viewHome';

// export interface FeedConfig extends IBaseComponentConfig {
// 	className: string;
// }

export class ViewMessages extends ViewHome {
	constructor(config: HomeConfig, root: Root) {
		super(config, root);
	}

	protected _updateContent(parent: IBaseComponent) {
		console.log('content');
		this._clearContent();
		this._renderContent(parent);
	}

	private _clearContent() {
		if (this._components.content) {
			const content = this._components.content;
			content.remove();
		}
	}

	protected _renderContent(parent: IBaseComponent): void {
		const messagesConfig = this._config.main.content;
		const messages = new Content(messagesConfig, parent);
		messages.render();
		this._components.content = messages;

		// Тестовые друзья
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
		}
	}
}