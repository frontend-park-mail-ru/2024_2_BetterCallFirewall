import { ShortProfileResponse } from '../models/profile';
import { Action, ActionType } from './action';

export const ACTION_FRIENDS_TYPES = {
	getFriends: 'actionFriendsGetFriends',
	getFriendsSuccess: 'actionFriendsGetFriendsSuccess',
	getFriendsFail: 'actionFriendsGetFriendsFail',
	getSubscribersSuccess: 'actionFriendsGetSubscribersSuccess',
	getSubscribersFail: 'actionFriendsGetSubscribersFail',
	getSubscriptionsSuccess: 'actionFriendsGetSubscriptionsSuccess',
	getUsersSuccess: 'actionFriendsGetUsersSuccess',
	getUsersFail: 'actionFriendsGetUsersFail',
	subscribe: 'actionFriendsSubscribe',
	subscribeSuccess: 'actionFriendsSubscribeSuccess',
	subscribeFail: 'actionFriendsSubscribeFail',
	unsubscribe: 'actionFriendsUnsubscribe',
	unsubscribeSuccess: 'actionFriendsUnsubscribeSuccess',
	unsubscribeFail: 'actionFriendsUnsubscribeFail',
	accept: 'actionFriendsAccept',
	acceptSuccess: 'actionFriendsAcceptSuccess',
	acceptFail: 'actionFriendsAcceptFail',
	removeSuccess: 'actionFriendsRemoveSuccess',
	removeFail: 'actionFriendsRemoveFail',
};

export class ActionFriendsGetFriends implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_FRIENDS_TYPES.getFriends;
		this.data = {};
	}
}

export interface ActionFriendsGetFriendsSuccessData {
	friends: ShortProfileResponse[];
}

export class ActionFriendsGetFriendsSuccess implements Action {
	type: ActionType;
	data: ActionFriendsGetFriendsSuccessData;

	constructor(data: ActionFriendsGetFriendsSuccessData) {
		this.type = ACTION_FRIENDS_TYPES.getFriendsSuccess;
		this.data = data;
	}
}

export interface ActionFriendsGetSubscribersSuccessData {
	subscribers: ShortProfileResponse[];
}

export class ActionFriendsGetSubscribersSuccess implements Action {
	type: ActionType;
	data: ActionFriendsGetSubscribersSuccessData;

	constructor(data: ActionFriendsGetSubscribersSuccessData) {
		this.type = ACTION_FRIENDS_TYPES.getSubscribersSuccess;
		this.data = data;
	}
}

export interface ActionFriendsGetSubscriptionsSuccessData {
	subscriptions: ShortProfileResponse[];
}

export class ActionFriendsGetSubscriptionsSuccess implements Action {
	type: ActionType;
	data: ActionFriendsGetSubscriptionsSuccessData;

	constructor(data: ActionFriendsGetSubscriptionsSuccessData) {
		this.type = ACTION_FRIENDS_TYPES.getSubscriptionsSuccess;
		this.data = data;
	}
}

export interface ActionFriendsGetUsersSuccessData {
	users: ShortProfileResponse[];
}

export class ActionFriendsGetUsersSuccess implements Action {
	type: ActionType;
	data: ActionFriendsGetUsersSuccessData;

	constructor(data: ActionFriendsGetUsersSuccessData) {
		this.type = ACTION_FRIENDS_TYPES.getUsersSuccess;
		this.data = data;
	}
}

export class ActionFriendsSubscribe implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.subscribe;
	data: { profileId: number };

	constructor(profileId: number) {
		this.data = { profileId };
	}
}

export class ActionFriendsSubscribeSuccess implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.subscribeSuccess;
	data: object = {};
}

export class ActionFriendsSubscribeFail implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.subscribeFail;
	data: object = {};
}

export class ActionFriendsUnsubscribe implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.unsubscribe;
	data: { profileId: number };

	constructor(profileId: number) {
		this.data = { profileId };
	}
}

export class ActionFriendsUnsubscribeSuccess implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.unsubscribeSuccess;
	data: object = {};
}

export class actionFriendsUnsubscribeFail implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.unsubscribeFail;
	data: object = {};
}

export interface ActionFriendsAcceptData {
	id: number;
}

export class ActionFriendsAccept implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.accept;
	data: ActionFriendsAcceptData;

	constructor(profileId: number) {
		this.data = { id: profileId };
	}
}

export class ActionFriendsAcceptSuccess implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.acceptSuccess;
	data: object = {};
}

export class actionFriendsAcceptFail implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.acceptFail;
	data: object = {};
}

export class ActionFriendsRemoveSuccess implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.removeSuccess;
	data: object = {};
}

export class actionFriendsRemoveFail implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.removeFail;
	data: object = {};
}
