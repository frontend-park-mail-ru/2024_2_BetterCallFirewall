import { ShortProfileResponse } from '../models/profile';
import { Action, ActionType } from './action';

export const ACTION_FRIENDS_TYPES = {
	getFriends: 'actionFriendsGetFriends',
	getFriendsSuccess: 'actionFriendsGetFriendsSuccess',
	getFriendsFail: 'actionFriendsGetFriendsFail',
	getSubscribersSuccess: 'actionFriendsGetSubscribersSuccess',
	getSubscribersFail: 'actionFriendsGetSubscribersFail',
	getUsersSuccess: 'actionFriendsGetUsersSuccess',
	getUsersFail: 'actionFriendsGetUsersFail',
	subscribeSuccess: 'actionFriendsSubscribeSuccess',
	subscribeFail: 'actionFriendsSubscribeFail',
	unsubscribeSuccess: 'actionFriendsUnsubscribeSuccess',
	unsubscribeFail: 'actionFriendsUnsubscribeFail',
	acceptSuccess: 'actionFriendsAcceptSuccess',
	acceptFail: 'actionFriendsAcceptFail',
	removeSuccess: 'actionFriendsRemoveSuccess',
	removeFail: 'actionFriendsRemoveFail',
};

export class ActionProfileGetFriends implements Action {
	type: ActionType;
	data: object;

	constructor() {
		this.type = ACTION_FRIENDS_TYPES.getFriends;
		this.data = {};
	}
}

export interface ActionProfileGetFriendsSuccessData {
	friends: ShortProfileResponse[];
}

export class ActionProfileGetFriendsSuccess implements Action {
	type: ActionType;
	data: ActionProfileGetFriendsSuccessData;

	constructor(data: ActionProfileGetFriendsSuccessData) {
		this.type = ACTION_FRIENDS_TYPES.getFriendsSuccess;
		this.data = data;
	}
}

export interface ActionProfileGetSubscribersSuccessData {
	subscribers: ShortProfileResponse[];
}

export class ActionProfileGetSubscribersSuccess implements Action {
	type: ActionType;
	data: ActionProfileGetSubscribersSuccessData;

	constructor(data: ActionProfileGetSubscribersSuccessData) {
		this.type = ACTION_FRIENDS_TYPES.getSubscribersSuccess;
		this.data = data;
	}
}

export interface ActionProfileGetUsersSuccessData {
	users: ShortProfileResponse[];
}

export class ActionProfileGetUsersSuccess implements Action {
	type: ActionType;
	data: ActionProfileGetUsersSuccessData;

	constructor(data: ActionProfileGetUsersSuccessData) {
		this.type = ACTION_FRIENDS_TYPES.getUsersSuccess;
		this.data = data;
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

export class ActionFriendsUnsubscribeSuccess implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.unsubscribeSuccess;
	data: object = {};
}

export class actionFriendsUnsubscribeFail implements Action {
	type: ActionType = ACTION_FRIENDS_TYPES.unsubscribeFail;
	data: object = {};
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
