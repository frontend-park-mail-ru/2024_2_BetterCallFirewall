import { ACTION_APP_TYPES, ActionAppGoTo } from '../../actions/actionApp';
import { ActionChatGoToChat } from '../../actions/actionChat';
import {
	ACTION_FRIENDS_TYPES,
	ActionProfileGetFriends,
} from '../../actions/actionFriends';
import api from '../../api/api';
import { Root } from '../../components';
import { Friends, FriendsConfig } from '../../components/Friends/Friends';
import { PAGE_URLS } from '../../config';
import { update } from '../../modules/vdom';
import { ChangeFriends } from '../../stores/storeFriends';
import { ComponentsHome, HomeConfig, ViewHome } from '../home/viewHome';

export type ComponentsFriends = {
	friends?: Friends;
	subscribers?: Friends;
	subscriptions?: Friends;
	users?: Friends;
} & ComponentsHome;

export interface ViewFriendsConfig extends HomeConfig {
	friends: FriendsConfig;
	subscribers: FriendsConfig;
	users: FriendsConfig;
	subscriptions: FriendsConfig;
	pendingUsersRequest: boolean;
}

export class ViewFriends extends ViewHome {
	protected _configFriends: ViewFriendsConfig;
	protected _components: ComponentsFriends = {};

	constructor(config: ViewFriendsConfig, root: Root) {
		super(config, root);
		this._configFriends = config;
	}

	get config(): ViewFriendsConfig {
		return this._configFriends;
	}

	handleChange(change: ChangeFriends): void {
		super.handleChange(change);
		switch (change.type) {
			case ACTION_APP_TYPES.actionAppInit:
			case ACTION_APP_TYPES.goTo:
				this._configFriends = Object.assign(
					this._configFriends,
					change.data,
				);
				this.render();
				break;
			case ACTION_FRIENDS_TYPES.subscribeSuccess:
			case ACTION_FRIENDS_TYPES.removeSuccess:
			case ACTION_FRIENDS_TYPES.unsubscribeSuccess:
			case ACTION_FRIENDS_TYPES.acceptSuccess:
				this.sendAction(new ActionProfileGetFriends());
				break;
			case ACTION_FRIENDS_TYPES.getFriends:
				this.updateViewFriends(change.data);
				api.requestFriends(this._configFriends.main.header.profile.id);
				api.requestSubscribers(
					this._configFriends.main.header.profile.id,
				);
				api.requestSubscriptions(
					this._configFriends.main.header.profile.id,
				);
				if (!this._configFriends.pendingUsersRequest) {
					api.requestUsers();
				}
				break;
			default:
				this.updateViewFriends(change.data);
		}
	}

	updateViewFriends(data: ViewFriendsConfig) {
		this.updateViewHome(data);
		this._configFriends = Object.assign(this._configFriends, data);
		this._render();
	}

	render(): void {
		this._render();
		this.sendAction(new ActionProfileGetFriends());
	}

	protected get friends(): Friends {
		const friends = this._components.friends;
		if (!friends) {
			throw new Error('friends does not exist');
		}
		return friends;
	}

	protected get subscribers(): Friends {
		const subscribers = this._components.subscribers;
		if (!subscribers) {
			throw new Error('subscribers does not exist');
		}
		return subscribers;
	}

	protected get subscriptions(): Friends {
		const subscriptions = this._components.subscriptions;
		if (!subscriptions) {
			throw new Error('subscriptions does not exist');
		}
		return subscriptions;
	}

	protected get users(): Friends {
		const users = this._components.users;
		if (!users) {
			throw new Error('users does not exist');
		}
		return users;
	}

	protected _render(): void {
		const rootNode = this._root.node;

		super._render();
		this._renderFriends();
		this._renderSubscribers();
		this._renderSubscriptions();
		this._renderUsers();

		const rootVNode = this._root.newVNode();

		this._addHandlers();

		update(rootNode, rootVNode);
	}

	protected _addHandlers() {
		super._addHandlers();
		this._addFriendsHandlers(this.friends);
		this._addFriendsHandlers(this.subscribers);
		this._addFriendsHandlers(this.subscriptions);
		this._addFriendsHandlers(this.users);
		this._addScrollHandler();
	}

	private _renderFriends(): void {
		this._components.friends = new Friends(
			this._configFriends.friends,
			this.content,
		);
	}

	private _renderSubscribers() {
		this._components.subscribers = new Friends(
			this._configFriends.subscribers,
			this.content,
		);
	}

	private _renderSubscriptions() {
		this._components.subscriptions = new Friends(
			this._configFriends.subscriptions,
			this.content,
		);
	}

	private _renderUsers() {
		this._components.users = new Friends(
			this._configFriends.users,
			this.content,
		);
	}

	private _addFriendsHandlers(people: Friends) {
		people.listPeople.forEach((person) => {
			const personConfig = person.config;
			if (personConfig.isFriend) {
				person.removeFriendButtonVNode.handlers.push({
					event: 'click',
					callback: (event) => {
						event.preventDefault();
						api.removeFriend(personConfig.id);
					},
				});
			} else if (personConfig.isSubscriber) {
				person.acceptFriendButtonVNode.handlers.push({
					event: 'click',
					callback: (event) => {
						event.preventDefault();
						api.acceptFriend(personConfig.id);
					},
				});
			} else if (personConfig.isSubscription) {
				person.unsubscribeFriendButtonVNode.handlers.push({
					event: 'click',
					callback: (event) => {
						event.preventDefault();
						api.unsubscribeToProfile(personConfig.id);
					},
				});
			} else {
				person.subscribeFriendButtonVNode.handlers.push({
					event: 'click',
					callback: (event) => {
						event.preventDefault();
						api.subscribeToProfile(personConfig.id);
					},
				});
			}
			person.profileLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionAppGoTo(`/${person.config.id}`));
				},
			});
			person.profileLinkAvatarVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this.sendAction(new ActionAppGoTo(`/${person.config.id}`));
				},
			});
			person.writeMessageLinkVNode.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					const config = person.config;
					this.sendAction(
						new ActionChatGoToChat({
							href: PAGE_URLS.chat + `/${config.id}`,
						}),
					);
				},
			});
		});
	}

	private _addScrollHandler() {
		let debounceTimeout: NodeJS.Timeout;
		const handler = () => {
			if (this._isNearBottom()) {
				clearTimeout(debounceTimeout);
				debounceTimeout = setTimeout(() => {
					const users = this._configFriends.users.friendsConfig;
					api.requestUsers(users[users.length - 1]?.id);
				}, 200);
			}
		};
		this._root.addDocumentHandler({ event: 'scroll', callback: handler });
	}
}
