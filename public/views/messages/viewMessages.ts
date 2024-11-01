import { ActionGoToChat } from '../../actions/actionChat';
import { ActionUpdateMessages } from '../../actions/actionMessages';
import { Content, Root } from '../../components';
import { IMessagesConfig, Message } from '../../components/Message/Message';
import dispatcher from '../../dispatcher/dispatcher';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsMessages = {
    messages?: Message;
} & ComponentsHome;

export interface ViewMessagesConfig {
    home: HomeConfig;
    messages: IMessagesConfig;
}

export class ViewMessages extends ViewHome {
    protected _configMessages: ViewMessagesConfig;
    protected _components: ComponentsMessages = {};

    constructor(config: ViewMessagesConfig, root: Root) {
        super(config.home, root);
        this._configMessages = config;
    }

    render(): void {
        super.render();
        dispatcher.getAction(
            new ActionUpdateMessages(this._configMessages.messages),
        );
    }

    updateViewMessages(data: ViewMessagesConfig): void {
        data.messages = {
            key: 'message',
            avatar: '../../img/avatar.png',
            name: 'Asap Rocky',
            lastMessage: 'Lets do it.',
            date: '12:34',
            unreadedCount: 3,
        }; // tmp
        this._configMessages = data;
        this.updateViewHome(data.home);
        this._renderMessages();
    }

    protected _rerender(): void {
        super._rerender();
        this._renderMessages();
    }

    protected _renderMessages(): void {
        const content = this._components.content;
        if (!content) {
            throw new Error('content does no exist on ViewMessages');
        }
        const messages = new Content({
			...this._configMessages.messages,
			className: 'messages',
		}, content);
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