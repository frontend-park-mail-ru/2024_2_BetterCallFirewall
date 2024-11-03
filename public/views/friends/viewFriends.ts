import { ACTION_APP_TYPES } from '../../actions/actionApp';
import {
	ACTION_FRIENDS_TYPES,
	ActionProfileGetFriends,
} from '../../actions/actionFriends';
import { ACTION_MENU_TYPES } from '../../actions/actionMenu';
import api from '../../api/api';
import { Root } from '../../components';
import { Friends, FriendsConfig } from '../../components/Friends/Friends';
import { ChangeFriends } from '../../stores/storeFriends';
import { HomeConfig, IViewHome, ViewHome } from '../home/viewHome';

export interface ViewFriendsConfig extends HomeConfig {
	friends: FriendsConfig;
	subcribers: FriendsConfig;
	users: FriendsConfig;
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
			case ACTION_APP_TYPES.actionAppInit:
			case ACTION_MENU_TYPES.menuLinkClick:
				this.render();
				this.sendAction(new ActionProfileGetFriends());
				break;
			case ACTION_FRIENDS_TYPES.getUsersSuccess:
			case ACTION_FRIENDS_TYPES.getSubscribersSuccess:
			case ACTION_FRIENDS_TYPES.getFriendsSuccess:
				this.updateViewFriends(change.data);
				break;
			case ACTION_FRIENDS_TYPES.getFriends:
				this.updateViewFriends(change.data);
				api.requestFriends(this._configFriends.main.header.profile.id);
				api.requestSubscribers(
					this._configFriends.main.header.profile.id,
				);
				api.requestUsers();
				break;
		}
	}

	updateViewFriends(data: ViewFriendsConfig) {
		this._configFriends = Object.assign(this._configFriends, data);
		this._render();
	}

	render(): void {
		this._render();
	}

	protected _render(): void {
		super._render();
		this._renderFriends();
		this._renderSubscribers();
		this._renderUsers();
	}

	private _renderFriends(): void {
		const content = this.content;
		const friends = new Friends(this._configFriends.friends, content);
		friends.render();
	}

	private _renderSubscribers() {
		const content = this.content;
		const subscribers = new Friends(
			this._configFriends.subcribers,
			content,
		);
		subscribers.render();
	}

	private _renderUsers() {
		const content = this.content;
		const users = new Friends(this._configFriends.users, content);
		users.render();
	}
}
