import { Action } from '../actions/action';
import config from '../config';
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
	switch (action.type) {
		default:
			return state;
	}
};
