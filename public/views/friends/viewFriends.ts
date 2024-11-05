import { ACTION_APP_TYPES } from '../../actions/actionApp';
import { ActionChatGoToChat } from '../../actions/actionChat';
import {
	ACTION_FRIENDS_TYPES,
	ActionProfileGetFriends,
} from '../../actions/actionFriends';
import {
	ACTION_MENU_TYPES,
	ActionMenuLinkClick,
} from '../../actions/actionMenu';
import api from '../../api/api';
import { Root } from '../../components';
import { IFriendConfig } from '../../components/Friend/Friend';
import { Friends, FriendsConfig } from '../../components/Friends/Friends';
import { PAGE_LINKS } from '../../config';
import { ChangeFriends } from '../../stores/storeFriends';
import { HomeConfig, IViewHome, ViewHome } from '../home/viewHome';

export interface ViewFriendsConfig extends HomeConfig {
	friends: FriendsConfig;
	subscribers: FriendsConfig;
	users: FriendsConfig;
	subscriptions: FriendsConfig;
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
		console.log('ViewFriends:', change);
		super.handleChange(change);
		switch (change.type) {
			case ACTION_APP_TYPES.actionAppInit:
			case ACTION_MENU_TYPES.menuLinkClick:
				this.render();
				this.sendAction(new ActionProfileGetFriends());
				break;
			case ACTION_FRIENDS_TYPES.subscribeSuccess:
			case ACTION_FRIENDS_TYPES.removeSuccess:
			case ACTION_FRIENDS_TYPES.unsubscribeSuccess:
			case ACTION_FRIENDS_TYPES.acceptSuccess:
				this.sendAction(new ActionProfileGetFriends());
				break;
			case ACTION_FRIENDS_TYPES.getUsersSuccess:
			case ACTION_FRIENDS_TYPES.getSubscribersSuccess:
			case ACTION_FRIENDS_TYPES.getFriendsSuccess:
				case ACTION_FRIENDS_TYPES.getSubscriptionsSuccess:
				this.updateViewFriends(change.data);
				break;
			case ACTION_FRIENDS_TYPES.getFriends:
				this.updateViewFriends(change.data);
				api.requestFriends(this._configFriends.main.header.profile.id);
				api.requestSubscribers(
					this._configFriends.main.header.profile.id,
				);
				api.requestUsers();
				api.requestSubscriptions(this._configFriends.main.header.profile.id);
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
		this._renderSubscribtions();
	}

	private _renderFriends(): void {
		const content = this.content;
		const friends = new Friends(this._configFriends.friends, content);
		friends.render();
		this._addFriendsHandlers(friends);
	}

	private _renderSubscribers() {
		const content = this.content;
		const subscribers = new Friends(
			this._configFriends.subscribers,
			content,
		);
		subscribers.render();
		this._addFriendsHandlers(subscribers);
	}

	private _renderSubscribtions() {
		const content = this.content;
		const subscriptions = new Friends(
			this._configFriends.subscriptions,
			content,
		);
		subscriptions.render();
		this._addFriendsHandlers(subscriptions);
	}

	private _renderUsers() {
		const content = this.content;
		const users = new Friends(this._configFriends.users, content);
		users.render();
		this._addFriendsHandlers(users);
	}

	private _addFriendsHandlers(people: Friends) {
		people.listPeople.forEach((person) => {
			const personConfig = person.config as IFriendConfig;
			if (personConfig.isFriend) {
				person.addHandler(
					person.removeFriendButton,
					'click',
					(event) => {
						event.preventDefault();
						api.removeFriend(personConfig.id);
					},
				);
			} else if (personConfig.isSubscriber) {
				person.addHandler(
					person.acceptFriendButton,
					'click',
					(event) => {
						event.preventDefault();
						api.acceptFriend(personConfig.id);
					},
				);
			} else if (personConfig.isSubscription) {
				person.addHandler(
					person.unsubscribeFriendButton,
					'click',
					(event) => {
						event.preventDefault();
						api.unsubscribeToProfile(personConfig.id);
					},
				);
			} else {
				person.addHandler(
					person.subscribeFriendButton,
					'click',
					(event) => {
						event.preventDefault();
						api.subscribeToProfile(personConfig.id);
					},
				);
			}
			person.addHandler(person.profileLink, 'click', (event) => {
				event.preventDefault();
				this.sendAction(
					new ActionMenuLinkClick({ href: `/${person.config.id}` }),
				);
			});
			person.addHandler(person.writeMessageLink, 'click', (event) => {
				event.preventDefault();
				const config = person.config;
				this.sendAction(
					new ActionChatGoToChat({
						chatConfig: {
							key: `chat-${config.id}`,
							userId: config.id,
							companionAvatar: config.avatar,
							companionName: `${config.name}`,
							lastDateOnline: '-1',
							backButtonHref: PAGE_LINKS.messages,
							messages: [],
						},
					}),
				);
			});
		});
	}
}
