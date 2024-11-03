import { Action } from '../actions/action';
import {
	ACTION_FRIENDS_TYPES,
	ActionProfileGetFriendsSuccessData,
	ActionProfileGetSubscribersSuccessData,
	ActionProfileGetUsersSuccessData,
} from '../actions/actionFriends';
import config from '../config';
import { toFriendConfig } from '../models/profile';
import deepClone from '../modules/deepClone';
import { ViewFriendsConfig } from '../views/friends/viewFriends';

const initialState = deepClone(config.friendsConfig);

export const reducerFriends = (
	state: ViewFriendsConfig = initialState,
	action?: Action,
): ViewFriendsConfig => {
	if (!action) {
		return state;
	}
	const newState = deepClone(state);
	switch (action.type) {
		case ACTION_FRIENDS_TYPES.getUsersSuccess: {
			const actionData = action.data as ActionProfileGetUsersSuccessData;
			newState.friends.friendsConfig = actionData.users.map((user) =>
				toFriendConfig(user),
			);
			return newState;
		}
		case ACTION_FRIENDS_TYPES.getSubscribersSuccess: {
			const actionData =
				action.data as ActionProfileGetSubscribersSuccessData;
			newState.friends.friendsConfig = actionData.subscribers.map(
				(subscriber) => toFriendConfig(subscriber),
			);
			return newState;
		}
		case ACTION_FRIENDS_TYPES.getFriendsSuccess: {
			const actionData =
				action.data as ActionProfileGetFriendsSuccessData;
			newState.friends.friendsConfig = actionData.friends.map((friend) =>
				toFriendConfig(friend),
			);
			return newState;
		}
		default:
			return state;
	}
};
