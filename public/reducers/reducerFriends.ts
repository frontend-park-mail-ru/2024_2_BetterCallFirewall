import { Action } from '../actions/action';
import {
	ACTION_FRIENDS_TYPES,
	ActionFriendsGetFriends,
	ActionFriendsGetFriendsSuccessData,
	ActionFriendsGetSubscribersSuccessData,
	ActionFriendsGetSubscriptionsSuccessData,
	ActionFriendsGetUsersSuccess,
} from '../actions/actionFriends';
import config from '../config';
import { toFriendConfig } from '../models/profile';
import deepClone from '../modules/deepClone';
import { ViewFriendsConfig } from '../views/friends/viewFriends';

const MESSAGES = {
	emptyFriends: 'Друзей нет',
	emptySubscribers: 'Подписчиков нет',
	emptySubscriptions: 'Подписок нет',
};

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
		case ACTION_FRIENDS_TYPES.getSubscribersSuccess: {
			const actionData =
				action.data as ActionFriendsGetSubscribersSuccessData;
			newState.subscribers.friendsConfig = actionData.subscribers.map(
				(subscriber) => toFriendConfig(subscriber),
			);
			if (!newState.subscribers.friendsConfig.length) {
				newState.subscribers.messageText = MESSAGES.emptySubscribers;
			}
			return newState;
		}
		case ACTION_FRIENDS_TYPES.getFriendsSuccess: {
			const actionData =
				action.data as ActionFriendsGetFriendsSuccessData;
			newState.friends.friendsConfig = actionData.friends.map((friend) =>
				toFriendConfig(friend),
			);
			if (!newState.friends.friendsConfig.length) {
				newState.friends.messageText = MESSAGES.emptyFriends;
			}
			return newState;
		}
		case ACTION_FRIENDS_TYPES.getSubscriptionsSuccess: {
			const actionData =
				action.data as ActionFriendsGetSubscriptionsSuccessData;
			newState.subscriptions.friendsConfig = actionData.subscriptions.map(
				(subscription) => toFriendConfig(subscription),
			);
			if (!newState.subscriptions.friendsConfig.length) {
				newState.subscriptions.messageText =
					MESSAGES.emptySubscriptions;
			}
			return newState;
		}
	}
	switch (true) {
		case action instanceof ActionFriendsGetFriends:
			newState.pendingUsersRequest = true;
			break;
		case action instanceof ActionFriendsGetUsersSuccess: {
			const newUsers = action.data.users
				.filter(
					(user) =>
						!user.is_subscriber &&
						!user.is_friend &&
						!user.is_subscription,
				)
				.map((user) => {
					return toFriendConfig(user);
				});
			if (action.data.append) {
				newState.users.friendsConfig =
					newState.users.friendsConfig.concat(newUsers);
			} else {
				newState.users.friendsConfig = newUsers;
			}
			newState.pendingUsersRequest = false;
			break;
		}
	}
	return newState;
};
