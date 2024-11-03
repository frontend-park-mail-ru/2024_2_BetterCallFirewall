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
