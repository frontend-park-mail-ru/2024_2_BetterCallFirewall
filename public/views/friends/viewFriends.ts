import { Root } from '../../components';
import { Friend } from '../../components/Friend/Friend';
import { Friends, FriendsConfig } from '../../components/Friends/Friends';
import { ChangeFriends } from '../../stores/storeFriends';
import { HomeConfig, IViewHome, ViewHome } from '../home/viewHome';

export interface ViewFriendsConfig extends HomeConfig {
	friends: FriendsConfig;
}

export interface IViewFriends extends IViewHome {
	handleChange(change: ChangeFriends): void;
}

export class ViewFriends extends ViewHome implements IViewFriends {
	protected _configFriends: ViewFriendsConfig;

	constructor(config: ViewFriendsConfig, root: Root) {
		super(config, root);
		this._configFriends = config;
	}

	handleChange(change: ChangeFriends): void {
		super.handleChange(change);
		switch (change.type) {
			default:
		}
	}

	render(): void {
		this._render();
	}

	protected _render(): void {
		super._render();
		this._renderFriends();
	}

	protected _renderFriends(): void {
		const content = this.content;
		const friends = new Friends(this._configFriends.friends, content);
		friends.render();

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
