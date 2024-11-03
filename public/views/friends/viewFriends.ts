import { ACTION_FRIENDS_TYPES } from '../../actions/actionFriends';
import { Root } from '../../components';
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
			case ACTION_FRIENDS_TYPES.getFriendsSuccess:
				this.updateViewFriends(change.data);
		}
	}

	updateViewFriends(data: ViewFriendsConfig) {
		this._configFriends = Object.assign(this._configFriends, data);
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
	}
}
