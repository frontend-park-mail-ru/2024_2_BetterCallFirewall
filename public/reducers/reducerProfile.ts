import { Action } from '../actions/action';
import {
	ACTION_PROFILE_TYPES,
	ActionProfileGetYourOwnProfileSuccessData,
	ActionProfileRequestSuccessData,
	ActionUpdateProfileData,
} from '../actions/actionProfile';
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
		case ACTION_PROFILE_TYPES.updateProfile:
			actionData = action.data as ActionUpdateProfileData;
			newState.profile = Object.assign(newState.profile, actionData);
			return newState;
		case ACTION_PROFILE_TYPES.profileRequestSuccess: {
			actionData = action.data as ActionProfileRequestSuccessData;
			const profileConfig = toProfileConfig(
				newState.profile,
				actionData.profileResponse,
			);
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
			newState.profile = Object.assign(newState.profile, profileConfig);
			return newState;
		}
		// case ACTION_PROFILE_TYPES.getHeaderSuccess: {
		// 	const actionData = action.data as ActionProfileGetHeaderSuccessData;
		// 	const profileConfig = headerResponseToProfileConfig(
		// 		newState.profile,
		// 		actionData.headerResponse,
		// 	);
		// 	newState.profile = Object.assign(newState.profile, profileConfig);
		// 	return newState;
		// }
		case ACTION_PROFILE_TYPES.profileRequestFail:
		case ACTION_PROFILE_TYPES.goToProfile:
		case ACTION_PROFILE_TYPES.getYourOwnProfileFail:
		default:
			return state;
	}
};
