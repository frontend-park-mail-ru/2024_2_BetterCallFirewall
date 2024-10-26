import { Content, Root } from '../../components';
import { IBaseComponent } from '../../components/BaseComponent';
import { Friend } from '../../components/Friend/Friend';
import { HomeConfig, ViewHome } from '../home/viewHome';

// export interface FeedConfig extends IBaseComponentConfig {
// 	className: string;
// }

export class ViewFriends extends ViewHome {
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
		const friendsConfig = this._config.main.content;
		const friends = new Content(friendsConfig, parent);
		friends.render();
		this._components.content = friends;

		// Тестовые друзья
		for (let i = 0; i < 10; i++) {
			const friend = new Friend(
				{
					key: 'friend',
					avatar: '',
					name: 'Asap Rocky',
					description: 'Canadian singer, songwriter and actor.',
					isFriend: true,
				},
				this._components.content,
			);
            friends.addChild(friend);
            friend.render();
		}
	}
}
