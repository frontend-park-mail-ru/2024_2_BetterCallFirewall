import { Action } from '../actions/action';
import {
	ACTION_FRIENDS_TYPES,
	ActionFriendsGetFriendsSuccessData,
	ActionFriendsGetSubscribersSuccessData,
	ActionFriendsGetSubscriptionsSuccessData,
	ActionFriendsGetUsersSuccessData,
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
		case ACTION_FRIENDS_TYPES.getFriends:
			newState.friends.friendsConfig = [];
			newState.subscribers.friendsConfig = [];
			newState.subscriptions.friendsConfig = [];
			newState.users.friendsConfig = [];
			newState.pendingUsersRequest = true;
			return newState;
		case ACTION_FRIENDS_TYPES.getUsersSuccess: {
			const actionData = action.data as ActionFriendsGetUsersSuccessData;
			newState.users.friendsConfig = newState.users.friendsConfig.concat(
				actionData.users
					.filter(
						(user) =>
							!user.is_subscriber &&
							!user.is_friend &&
							!user.is_subscription,
					)
					.map((user) => {
						return toFriendConfig(user);
					}),
			);
			newState.pendingUsersRequest = false;
			return newState;
		}
		case ACTION_FRIENDS_TYPES.getSubscribersSuccess: {
			const actionData =
				action.data as ActionFriendsGetSubscribersSuccessData;
			newState.subscribers.friendsConfig = actionData.subscribers.map(
				(subscriber) => toFriendConfig(subscriber),
			);
			return newState;
		}
		case ACTION_FRIENDS_TYPES.getFriendsSuccess: {
			const actionData =
				action.data as ActionFriendsGetFriendsSuccessData;
			newState.friends.friendsConfig = actionData.friends.map((friend) =>
				toFriendConfig(friend),
			);
			return newState;
		}
		case ACTION_FRIENDS_TYPES.getSubscriptionsSuccess: {
			const actionData =
				action.data as ActionFriendsGetSubscriptionsSuccessData;
			newState.subscriptions.friendsConfig = actionData.subscriptions.map(
				(subscription) => toFriendConfig(subscription),
			);
			return newState;
		}
		default:
			return state;
	}
};
