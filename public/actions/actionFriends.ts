import { ShortProfileResponse } from '../models/profile';
import { Action, ActionType } from './action';

export const ACTION_FRIENDS_TYPES = {
	getFriends: 'actionFriendsGetFriends',
	getFriendsSuccess: 'actionFriendsGetFriendsSuccess',
	getFriendsFail: 'actionFriendsGetFriendsFail',
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
