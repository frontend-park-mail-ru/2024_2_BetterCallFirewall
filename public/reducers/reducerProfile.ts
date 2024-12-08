import { Action } from '../actions/action';
import { ACTION_APP_TYPES } from '../actions/actionApp';
import {
	ACTION_POST_TYPES,
	ActionPostLikeSuccessData,
} from '../actions/actionPost';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetYourOwnProfileSuccessData,
	ActionProfileRequestSuccessData,
} from '../actions/actionProfile';
import {
	ACTION_PROFILE_EDIT_TYPES,
	ActionProfileEditRequestSuccessData,
} from '../actions/actionProfileEdit';
import app from '../app';
import config from '../config';
import { toProfileConfig } from '../models/profile';
import deepClone from '../modules/deepClone';
import { ViewProfileConfig } from '../views/profile/viewProfile';

const initialState: ViewProfileConfig = deepClone(config.profileConfig);

export const reducerProfile = (
	state: ViewProfileConfig = initialState,
	action?: Action,
) => {
	const newState = deepClone(state);
	let actionData;
	switch (action?.type) {
		case ACTION_APP_TYPES.actionAppInit:
		case ACTION_APP_TYPES.goTo:
			newState.path = app.router.path;
			return newState;
		case ACTION_PROFILE_EDIT_TYPES.requestSuccess: {
			actionData = action.data as ActionProfileEditRequestSuccessData;
			const profileConfig = toProfileConfig(
				newState.profile,
				actionData.profileResponse,
			);
			newState.path = `/${actionData.profileResponse.id}`;
			newState.profile = Object.assign(newState.profile, profileConfig);
			return newState;
		}
		case ACTION_PROFILE_TYPES.profileRequestSuccess: {
			actionData = action.data as ActionProfileRequestSuccessData;
			const profileConfig = toProfileConfig(
				newState.profile,
				actionData.profileResponse,
			);
			newState.path = `/${actionData.profileResponse.id}`;
			newState.profile = Object.assign(newState.profile, profileConfig);
			return newState;
		}
		case ACTION_PROFILE_TYPES.getYourOwnProfileSuccess: {
			const actionData =
				action.data as ActionProfileGetYourOwnProfileSuccessData;
			const profileConfig = toProfileConfig(
				newState.profile,
				actionData.profile,
			);
			newState.path = `/${actionData.profile.id}`;
			newState.profile = Object.assign(newState.profile, profileConfig);
			return newState;
		}
		case ACTION_POST_TYPES.likeSuccess: {
			const actionData = action.data as ActionPostLikeSuccessData;
			newState.profile.posts.forEach((postConfig) => {
				if (postConfig.id === actionData.postId) {
					postConfig.likedByUser = !postConfig.likedByUser;
					if (postConfig.likedByUser) {
						postConfig.likes++;
					} else {
						postConfig.likes--;
					}
				}
			});
			return newState;
		}
		default:
			return newState;
	}
};
