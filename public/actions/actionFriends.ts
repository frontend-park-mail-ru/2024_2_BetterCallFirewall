import { ShortProfileResponse } from '../models/profile';
import { Action, ActionType } from './action';

export const ACTION_FRIENDS_TYPES = {
	getFriendsSuccess: 'actionFriendsGetFriendsSuccess',
	getFriendsFail: 'actionFriendsGetFriendsFail',
};

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
