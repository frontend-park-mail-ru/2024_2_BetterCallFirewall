import { Action } from '../actions/action';
import {
	ACTION_FRIENDS_TYPES,
	ActionFriendsGetAll,
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
			newState.subscribers.messageText = newState.subscribers
				.friendsConfig.length
				? MESSAGES.emptySubscribers
				: '';
			return newState;
		}
		case ACTION_FRIENDS_TYPES.getFriendsSuccess: {
			const actionData =
				action.data as ActionFriendsGetFriendsSuccessData;
			newState.friends.friendsConfig = actionData.friends.map((friend) =>
				toFriendConfig(friend),
			);
			newState.friends.messageText = newState.friends.friendsConfig.length
				? ''
				: MESSAGES.emptyFriends;
			return newState;
		}
		case ACTION_FRIENDS_TYPES.getSubscriptionsSuccess: {
			const actionData =
				action.data as ActionFriendsGetSubscriptionsSuccessData;
			newState.subscriptions.friendsConfig = actionData.subscriptions.map(
				(subscription) => toFriendConfig(subscription),
			);
			newState.subscriptions.messageText = newState.subscriptions
				.friendsConfig.length
				? ''
				: MESSAGES.emptySubscriptions;
			return newState;
		}
	}
	switch (true) {
		case action instanceof ActionFriendsGetAll:
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
