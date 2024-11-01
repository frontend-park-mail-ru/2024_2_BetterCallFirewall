import { Root } from '../../components';
import { Friend } from '../../components/Friend/Friend';
import { ChangeFriends } from '../../stores/storeFriends';
import { HomeConfig, IViewHome, ViewHome } from '../home/viewHome';

export interface ViewFriendsConfig extends HomeConfig {}

export interface IViewFriends extends IViewHome {
	handleChange(change: ChangeFriends): void;
}

export class ViewFriends extends ViewHome implements IViewFriends {
	constructor(config: ViewFriendsConfig, root: Root) {
		super(config, root);
	}

	handleChange(change: ChangeFriends): void {
		super.handleChange(change);
		switch (change.type) {
			default:
		}
	}

	protected _renderContent(): void {
		super._renderContent();
		const content = this._components.content;
		if (!content) {
			throw new Error('content does no exist on ViewProfile');
		}
		// Тестовые друзья
		for (let i = 0; i < 10; i++) {
			const friend = new Friend(
				{
					key: 'friend',
					avatar: '../../img/avatar.png',
					name: 'Asap Rocky',
					description: 'Canadian singer, songwriter and actor.',
					isFriend: true,
				},
				content,
			);
			content.addChild(friend);
			friend.render();
		}
	}
}
