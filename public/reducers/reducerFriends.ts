import { Action } from '../actions/action';
import {
	ACTION_FRIENDS_TYPES,
	ActionProfileGetFriendsSuccessData,
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
