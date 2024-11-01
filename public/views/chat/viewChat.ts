import { ActionUpdateChat } from '../../actions/actionChat';
import { Root } from '../../components';
import { Chat, IChatConfig } from '../../components/Chat/Chat';
import dispatcher from '../../dispatcher/dispatcher';
import { ChangeChat } from '../../stores/storeChat';
import { ComponentsHome, HomeConfig, IViewHome, ViewHome } from '../home/viewHome';


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
    }

    render(): void {
        this._render();
        dispatcher.getAction(
            new ActionUpdateChat(this._configChat.chat),
        );
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
            key: 'chat',
            companionAvatar: '../../img/avatar.png',
            companionName: 'Asap Rocky',
            lastDateOnline: '18:00',
        }; // tmp

        const content = this._components.content;
        if (!content) {
            throw new Error('content does no exist on ViewChat');
        }
        const chat = new Chat(this._configChat.chat, content);
        chat.render();
        this._components.chat = chat;
    }
}