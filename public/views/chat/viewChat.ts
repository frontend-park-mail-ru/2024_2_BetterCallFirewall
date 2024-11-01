import { ActionUpdateChat } from '../../actions/actionChat';
import { Root } from '../../components';
import { Chat, IChatConfig } from '../../components/Chat/Chat';
import dispatcher from '../../dispatcher/dispatcher';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsChat = {
    chat?: Chat;
} & ComponentsHome;

export interface ViewChatConfig {
    home: HomeConfig;
    chat: IChatConfig;
}

export class ViewChat extends ViewHome {
    protected _configChat: ViewChatConfig;
    protected _components: ComponentsChat = {};

    constructor(config: ViewChatConfig, root: Root) {
        super(config.home, root);
        this._configChat = config;
    }

    render(): void {
        super.render();
        dispatcher.getAction(
            new ActionUpdateChat(this._configChat.chat),
        );
    }

    updateViewChat(data: ViewChatConfig): void {
        data.chat = {
            key: 'chat',
            companionAvatar: '../../img/avatar.png',
            companionName: 'Asap Rocky',
            lastDateOnline: '18:00',
        }; // tmp
        this._configChat = data;
        this.updateViewHome(data.home);
        this._renderChat();
    }

    protected _rerender(): void {
        super._rerender();
        this._renderChat();
    }

    protected _renderChat(): void {
        const content = this._components.content;
        if (!content) {
            throw new Error('content does no exist on ViewChat');
        }
        const chat = new Chat(this._configChat.chat, content);
        chat.render();
        this._components.chat = chat;
    }
}