import { Content, Root } from '../../components';
import { IBaseComponent } from '../../components/BaseComponent';
import { Chat } from '../../components/Chat/Chat';
import { HomeConfig, ViewHome } from '../home/viewHome';

// export interface FeedConfig extends IBaseComponentConfig {
// 	className: string;
// }

export class ViewChat extends ViewHome {
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
		const contentConfig = this._config.main.content;
		const content = new Content(contentConfig, parent);
		content.render();
		this._components.content = content;

        const chat = new Chat({
            key: 'chat',
            companionAvatar: '../../img/avatar.png',
            companionName: 'Asap Rocky',
            lastDateOnline: '18:00',
        }, content);
        content.addChild(chat);
        chat.render();
	}
}